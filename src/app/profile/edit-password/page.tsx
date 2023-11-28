import { Underdog } from 'next/font/google';
import { RegisterSchema, RegisterSchemaType } from '../../../utils/schemas';
import { apiAddress } from '../../../utils/variables';
import { revalidatePath } from 'next/cache';
import SubmitBtn from '@/components/SubmitBtn';

function validateLength(value: string) {
  if (value.length < 6) {
    return 'Must be at least 6 characters long';
  }
}

class AtomicState {
  constructor(
    public errors: {
      password: string | undefined;
      confirmPassword: string | undefined;
    } = { password: undefined, confirmPassword: undefined }
  ) {}
  setPasswordError(error) {
    this.errors.password = error;
  }
  setConfirmPasswordError(error) {
    this.errors.confirmPassword = error;
  }
  getPasswordError() {
    const errors = this.errors.password;
    return errors;
  }
  getConfirmPasswordError() {
    const errors = this.errors.confirmPassword;
    return errors;
  }
}

const state = new AtomicState();

async function changePassword(formData: FormData) {
  'use server';
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  if (password !== confirmPassword) {
    state.setConfirmPasswordError('Password fields do not match');
    revalidatePath('/profile/edit-password');
    return;
  }
  state.setPasswordError(validateLength(password));
  state.setConfirmPasswordError(validateLength(confirmPassword));
  if (Object.values(state.errors).some(Boolean)) {
    revalidatePath('/profile/edit-password');
    return;
  }
  const res = await fetch(
    `${apiAddress}/user/fc2c7d73-54bb-4113-938c-df79aa43198d`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    }
  );
  const data = await res.json();
  console.log(data);
}

const EditPassword = () => {
  return (
    <div className='min-h-[75vh] bg-white rounded-lg shadow-md text-black py-12 my-8 px-3 m-3 flex gap-11 flex-col md:mx-14 md:px-16 lg:mx-32 justify-center'>
      <div className='flex flex-col gap-3'>
        {/* TODO: Tips on hiw to get an effective add */}
        <h2 className='text-secondary text-3xl font-bold text-center mb-5'>
          Change Password
        </h2>
      </div>
      <form className='flex flex-col gap-3 mx-3' action={changePassword}>
        <input type='hidden' name='_method' value='patch' />
        <div>
          <label className='w-full h-6 text-black gap-2'>
            <p className='w-max'>Password:</p>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1'
            />
          </label>
          <span className='text-red-400 text-xs'>
            {' '}
            {state.getPasswordError()}
          </span>
        </div>
        <div>
          <label className='w-full h-6 text-black gap-2'>
            <p className='w-max'>Confirm Password:</p>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1 mb-3'
            />
          </label>
          <span className='text-red-400 text-xs'>
            {' '}
            {/* {errors?.confirmPassword} */}
            {state.getConfirmPasswordError()}
          </span>
        </div>
        <SubmitBtn text='Change Password' />
      </form>
    </div>
  );
};

export default EditPassword;
