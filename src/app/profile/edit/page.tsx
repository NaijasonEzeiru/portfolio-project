'use client';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditProfileSchema,
  EditProfileSchemaType
} from '../../../utils/schemas';
import { useRouter } from 'next/navigation';
import AuthContext from '@/components/AuthContext';
import { apiAddress } from '../../../utils/variables';
import LoadingPage from '@/components/LoadingPage';
import Image from 'next/image';

const EditProfile = () => {
  const { user, authChecking, setUser }: any = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    reset(user);
  }, [user]);

  console.log(user);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<EditProfileSchemaType>({
    mode: 'onChange',
    defaultValues: {
      ...user
    },
    resolver: zodResolver(EditProfileSchema)
  });
  let newURL: string;
  const newDP = watch('newImg')?.[0];

  if (newDP) {
    createBlobURL();
  }

  console.log({ errors });

  function createBlobURL() {
    newURL = URL.createObjectURL(newDP);
    console.log({ newURL });
    return () => URL.revokeObjectURL(newURL);
  }

  const editProfile = async ({
    email,
    firstName,
    lastName,
    phone,
    displayImg
  }: EditProfileSchemaType) => {
    const formData = new FormData();
    if (newDP) {
      console.log(newDP);
      formData.append('image', newDP);
    }
    formData.append('email', email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phone', phone.toString());
    formData.append('displayImg', displayImg);
    const res = await fetch(`${apiAddress}/user/${user.id}`, {
      method: 'PUT',
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      router.refresh();
      router.push('/profile?success=Profile updated successfully');
    } else if (data.message == 'This email address is already taken') {
      //TODO: make this work
      setError('email', {
        type: 'server',
        message: data.message
      });
    } else {
      alert(data?.message);
    }
  };

  return (
    <div className='min-h-[calc(100vh-(50px+456px))] md:min-h-[calc(100vh-(50px+256px))] bg-white flex items-center'>
      {authChecking ? (
        <LoadingPage />
      ) : (
        <div className='rounded-lg shadow-md text-black py-12 my-8 px-3 m-3 flex gap-11 flex-col md:mx-14 md:px-16 lg:mx-32 justify-center'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-secondary text-3xl font-bold text-center mb-5'>
              Edit your profile
            </h2>
            <h2 className='text-2xl'>{user.lastName}</h2>
          </div>

          <form
            onSubmit={handleSubmit(editProfile)}
            className='flex flex-col gap-10 mx-3'>
            <div>
              <div className='mx-auto relative w-fit'>
                <div className='w-28 h-28 rounded-full border-solid border-2 border-secondary shadow-lg bg-gray-100 flex items-center justify-center'>
                  {newURL ? (
                    <Image
                      src={newURL}
                      alt='new display picture'
                      className='h-full w-full object-cover rounded-full'
                      width={112}
                      height={112}
                    />
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-14 h-14'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                      />
                    </svg>
                  )}
                </div>
                <label className='bg-slate-700 p-2.5 rounded-full absolute bottom-0 right-0'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='h-5 w-5 border-b-2'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M15.232 5.23202L18.768 8.76802M16.732 3.73202C17.2009 3.26312 17.8369 2.99969 18.5 2.99969C19.1631 2.99969 19.7991 3.26312 20.268 3.73202C20.7369 4.20093 21.0003 4.8369 21.0003 5.50002C21.0003 6.16315 20.7369 6.79912 20.268 7.26802L6.5 21.036H3V17.464L16.732 3.73202Z'
                      stroke='#FFF'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                  <input
                    accept='image/*'
                    type='file'
                    hidden
                    {...register(`newImg`)}
                  />
                </label>
              </div>
              <div className='text-red-400 text-xs text-center'>
                {' '}
                {errors?.newImg?.message as string}
              </div>
            </div>
            <div>
              <label className='w-full h-6 flex text-black gap-2'>
                <div>
                  <p className='w-max'>First Name:</p>
                </div>
                <input
                  aria-invalid={!!errors.firstName?.message}
                  {...register('firstName')}
                  placeholder='John'
                  type='text'
                  className='w-full focus-visible:outline-0 border-b-2 border-gray-400 focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-goldColor bg-transparent'
                />
              </label>
              <span className='text-red-400 text-xs'>
                {errors.firstName?.message}
              </span>
            </div>
            <div>
              <label className='w-full h-6 flex text-black gap-2'>
                <div>
                  <p className='w-max'>Last Name:</p>
                </div>
                <input
                  {...register('lastName')}
                  placeholder='Doe'
                  type='text'
                  className='w-full focus-visible:outline-0 border-b-2 border-gray-400 focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-goldColor bg-transparent'
                />
              </label>
              <span className='text-red-400 text-xs'>
                {' '}
                {errors?.lastName?.message}
              </span>
            </div>
            <div>
              <label className='w-full h-6 flex text-black gap-2'>
                <div>
                  <p className='w-max'>Email:</p>
                </div>
                <input
                  type='email'
                  {...register('email')}
                  placeholder='abc@example.com'
                  name='email'
                  className='w-full focus-visible:outline-0 border-b-2 border-gray-400 focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-goldColor bg-transparent'
                />{' '}
              </label>
              <span className='text-red-400 text-xs'>
                {' '}
                {errors.email?.message}
              </span>
            </div>
            <div>
              <label className='w-full h-6 flex text-black gap-2'>
                <div>
                  <p className='w-max'>Phone Number:</p>
                </div>
                <input
                  type='number'
                  {...register('phone')}
                  placeholder='08012345678'
                  className='w-full focus-visible:outline-0 border-b-2 border-gray-400 focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-goldColor bg-transparent'
                />{' '}
              </label>
              <span className='text-red-400 text-xs'>
                {' '}
                {errors.phone?.message}
              </span>
            </div>
            <button disabled={isSubmitting} className='btn'>
              <span
                className={`animate-spin text-ctaColor px-4 ${
                  isSubmitting ? 'block' : 'hidden'
                }`}>
                {/* <ImSpinner /> */}
              </span>
              <p className={`${isSubmitting && 'opacity-40'}`}>Submit</p>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
