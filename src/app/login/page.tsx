'use client';

import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '../../utils/schemas';
import AuthContext from '../../components/AuthContext';

const Login = () => {
  // const [rememberMe, setRememberMe] = useState(false);
  const { login, err }: any = useContext(AuthContext);

  useEffect(() => {
    console.log({ zero: err });
    if (err === 'This email address is not registered') {
      console.log('email');
      setError('email', {
        type: 'server',
        message: err
      });
    } else if (err === 'This password is incorrect') {
      setError('password', {
        type: 'server',
        message: err
      });
    } else {
      console.log({ first: err });
    }
  }, [err]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema)
  });

  return (
    <div className='min-h-[75vh] max-w-lg md:mx-auto mx-auto bg-white rounded-lg shadow-md text-black text-center py-12 my-8 px-3 flex gap-11 flex-col md:px-16 justify-center'>
      <div className='flex gap-11 flex-col w-full'>
        <h2 className='text-secondary text-4xl font-bold'>LOG IN</h2>
        <div className='flex flex-col gap-3'>
          <form
            onSubmit={handleSubmit(login)}
            method='POST'
            className='flex flex-col gap-2 mx-3'>
            <div>
              <label className='w-full h-6 text-black gap-2'>
                <p className='w-max'>Email:</p>
                <div className=' w-full flex'>
                  <input
                    type='text'
                    autoComplete='email'
                    {...register('email')}
                    placeholder='abc@example.com'
                    id='email'
                    className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1 mb-3'
                  />
                </div>
              </label>
              <span className='text-red-400 text-xs'>
                <p>{errors?.email?.message}</p>
              </span>
            </div>
            <div className='relative mb-3'>
              <label className='w-full h-6 gap-2 text-black'>
                <p className='w-max'>Password:</p>
                <div className=' w-full flex'>
                  <input
                    type='password'
                    autoComplete='password'
                    {...register('password')}
                    placeholder='password'
                    id='password'
                    className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1 mb-3'
                  />
                </div>
              </label>
              <span className='text-red-400 text-xs'>
                <p>{errors?.password?.message}</p>
              </span>
            </div>
            <button disabled={isSubmitting} className='btn'>
              <span
                className={`animate-spin text-ctaColor px-4 ${
                  isSubmitting ? 'block' : 'hidden'
                }`}>
                {/* <ImSpinner /> */}
              </span>
              <p className={`${isSubmitting && 'opacity-40'}`}>Log In</p>
            </button>
          </form>

          <Link href={'#'}>
            <p className='text-secondary underline text-sm '>
              Forgot Password?
            </p>
          </Link>
          <div>
            <p className='text-sm  text-black'>
              Do not have an account?{' '}
              <Link href={'/register'} className='text-secondary underline'>
                Click here to sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
