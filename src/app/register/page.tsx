'use client';

import React, { Component, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterSchemaType } from '../../utils/schemas';
import { useRouter } from 'next/navigation';
import AuthContext from '@/components/AuthContext';
import { apiAddress } from '../../utils/variables';

const Register = () => {
	const { user }: any = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		// TODO: Display "You are already logged in"
		user && router.push('/');
	}, [user]);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm<RegisterSchemaType>({
		mode: 'onSubmit',
		resolver: zodResolver(RegisterSchema)
	});

	const signUp = async ({
		email,
		password,
		first_name,
		last_name
	}: {
		email: string;
		password: string;
		first_name: string;
		last_name: string;
	}) => {
		const res = await fetch(`${apiAddress}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password,
				first_name,
				last_name
			})
		});
		const data = await res.json();
		if (res.ok) {
			router.push('/login');
		} else if (data.emailError) {
			setError('email', {
				type: 'server',
				message: data.emailError
			});
		} else {
			console.log(data?.message);
		}
	};

	return (
		<div className='bg-white dark:bg-secondary rounded-lg shadow-md text-black dark:white py-12 my-8 px-3 m-3 text-center flex gap-11 flex-col md:mx-14 md:px-16 lg:mx-32'>
			<h2 className='text-secondary dark:text-white text-4xl font-bold'>
				Register
			</h2>
			<div className='flex flex-col gap-3'>
				<form
					onSubmit={handleSubmit(signUp)}
					className='flex flex-col gap-10'>
					<div>
						<label className='w-full h-6 flex text-black dark:text-gray-100 gap-2'>
							<div>
								<p className='w-max'>First Name:</p>
							</div>
							<input
								{...register('first_name')}
								placeholder='John'
								type='text'
								className='w-full focus-visible:outline-0 border-b-2 border-gray-400 focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-goldColor bg-transparent'
							/>
						</label>
						<span className='text-red-400 dark:text-red-300 text-xs'>
							{errors.first_name?.message}
						</span>
					</div>
					<div>
						<label className='w-full h-6 flex text-black dark:text-gray-100 gap-2'>
							<div>
								<p className='w-max'>Last Name:</p>
							</div>
							<input
								{...register('last_name')}
								placeholder='Doe'
								type='text'
								className='w-full focus-visible:outline-0 border-b-2 border-gray-400 focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-goldColor bg-transparent'
							/>
						</label>
						<span className='text-red-400 dark:text-red-300 text-xs'>
							{' '}
							{errors?.last_name?.message}
						</span>
					</div>
					<div>
						<label className='w-full h-6 flex text-black dark:text-gray-100 gap-2'>
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
						<span className='text-red-400 dark:text-red-300 text-xs'>
							{' '}
							{errors.email?.message}
						</span>
					</div>
					<div>
						<label className='w-full h-6 flex text-black dark:text-gray-100 gap-2'>
							<div>
								<p className='w-max'>Password:</p>
							</div>
							<input
								type='password'
								{...register('password')}
								placeholder='Password'
								name='password'
								className='w-full focus-visible:outline-0 border-b-2 border-gray-400 focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-goldColor bg-transparent'
							/>
						</label>
						<span className='text-red-400 dark:text-red-300 text-xs'>
							{' '}
							{errors.password?.message}
						</span>
					</div>
					<div>
						<label className='w-full h-6 flex text-black dark:text-gray-100 gap-2'>
							<div>
								<p className='w-max'>Confirm Password:</p>
							</div>
							<input
								{...register('confirm_password')}
								type='password'
								name='confirm_password'
								placeholder='Confirm Password'
								className='w-full focus-visible:outline-0 border-b-2 border-gray-400 focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-goldColor bg-transparent'
							/>
						</label>
						<span className='text-red-400 dark:text-red-300 text-xs'>
							{' '}
							{errors.confirm_password?.message}
						</span>
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
					<button
						type='submit'
						disabled={isSubmitting}
						className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary dark:bg-goldColor text-white dark:text-black w-max m-auto'>
						Sign Up
					</button>
				</form>
				<div>
					<p className='text-sm text-black dark:text-white'>
						Already have an account?{' '}
						<Link
							href='/login'
							className='text-secondary underline dark:text-goldColor'>
							Click here to log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
