'use client';

import React, { Component, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterSchemaType } from '../../utils/schemas';
import { useRouter } from 'next/navigation';
import { apiAddress } from '../../utils/variables';

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(RegisterSchema)
  });

  console.log(errors);

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
    phone
  }: RegisterSchemaType) => {
    const res = await fetch(`${apiAddress}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phone
      })
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/login');
    } else if (data.message == 'This email address is already taken') {
      setError('email', {
        type: 'server',
        message: data.message
      });
    } else {
      alert(data?.message);
    }
  };

  return (
    <div className='min-h-[75vh] bg-white max-w-lg md:mx-auto mx-auto rounded-lg shadow-md text-black text-center py-12 my-8 px-3 flex items-center md:px-16'>
      <div className='flex gap-11 flex-col w-full'>
        <h2 className='text-secondary text-4xl font-bold'>Register</h2>
        <div className='flex flex-col gap-3'>
          <form
            onSubmit={handleSubmit(signUp)}
            className='flex flex-col gap-1 mx-3'>
            <div>
              <label className='w-full h-6 text-black gap-2'>
                <p className='w-max'>First Name:</p>
                <input
                  {...register('firstName')}
                  placeholder='John'
                  type='text'
                  className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1 mb-3'
                />
              </label>
              <i className='text-red-400 text-xs'>
                {errors.firstName?.message}
              </i>
            </div>
            <div>
              <label className='w-full h-6 text-black gap-2'>
                <p className='w-max'>Last Name:</p>
                <input
                  {...register('lastName')}
                  placeholder='Doe'
                  type='text'
                  className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1 mb-3'
                />
              </label>
              <i className='text-red-400 text-xs'>
                {' '}
                {errors?.lastName?.message}
              </i>
            </div>
            <div>
              <label className='w-full h-6 text-black gap-2'>
                <p className='w-max'>Email:</p>
                <input
                  type='email'
                  {...register('email')}
                  placeholder='abc@example.com'
                  name='email'
                  className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1 mb-3'
                />{' '}
              </label>
              <i className='text-red-400 text-xs'> {errors.email?.message}</i>
            </div>
            <div>
              <label className='w-full h-6 text-black gap-2'>
                <p className='w-max'>Phone Number:</p>
                <input
                  type='number'
                  {...register('phone')}
                  placeholder='08012345678'
                  className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1 mb-3'
                />{' '}
              </label>
              <i className='text-red-400 text-xs'> {errors.phone?.message}</i>
            </div>
            <div>
              <label className='w-full h-6 text-black gap-2'>
                <p className='w-max'>Password:</p>
                <input
                  type='password'
                  {...register('password')}
                  placeholder='Password'
                  name='password'
                  className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1 mb-3'
                />
              </label>
              <i className='text-red-400 text-xs'>
                {' '}
                {errors.password?.message}
              </i>
            </div>
            <div>
              <label className='w-full h-6 text-black gap-2'>
                <p className='w-max'>Confirm Password:</p>
                <input
                  {...register('confirmPassword')}
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  className='w-full border border-gray-400 bg-transparent rounded-md h-9 px-1 mb-3'
                />
              </label>
              <i className='text-red-400 text-xs'>
                {' '}
                {errors.confirmPassword?.message}
              </i>
            </div>
            {/* <div className={styles.remember}>
						<form action="">
							<input
								type="checkbox"
								id="remember"
								name="remember"
							/>
							<label htmlFor="remember">Remember me</label>
						</form>
					</div> */}
            <button disabled={isSubmitting} className='btn mt-3'>
              <span
                className={`animate-spin text-ctaColor px-4 ${
                  isSubmitting ? 'block' : 'hidden'
                }`}>
                {/* <ImSpinner /> */}
              </span>
              <p className={`${isSubmitting && 'opacity-40'}`}>Sign Up</p>
            </button>
          </form>
          <div>
            <p className='text-sm text-black'>
              Already have an account?{' '}
              <Link href='/login' className='text-secondary underline'>
                Click here to log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
