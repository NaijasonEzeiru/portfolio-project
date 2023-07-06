'use client';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import Dropdown from './DropDown';
import ThemeSwitcher from './ThemeSwitcher';

const NavBar = () => {
	const [ham, setHam] = useState(false);
	const navRef = useRef(null);
	enum TabIndex {
		false = -1,
		true
	}

	const categories = [
		'Clothes',
		'Glasses',
		'Jewelries',
		'Bags',
		'Shoes',
		'Watches'
	];

	useEffect(() => {
		function handleClickOutsideModal(event) {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setHam(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutsideModal);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideModal);
		};
	}, [navRef]);

	return (
		<header
			className='bg-gray-100 flex items-center justify-between px-3 text-sm py-2 md:px-14 lg:px-32 dark:bg-secondary'
			ref={navRef}>
			<Link
				href={'/'}
				className='focus-visible:outline focus-visible:outline-1 focus-visible:outline-orange-400 text-base'>
				<span className='bg-secondary rounded-sm px-1 '>
					<span className='text-primary'>BA</span>
					<span className='text-white'>BAL&#39;O</span>
					<span className='text-primary'>JA</span>
				</span>
			</Link>
			<nav
				className={`flex gap-1 w-full left-0 absolute transition-transform z-50 bg-gray-100 flex-col py-8 px-2 top-11 md:w-auto md:static md:bg-transparent md:flex-row md:translate-x-0 md:py-0 dark:bg-secondary ${
					!ham && 'transition-transform -translate-x-full'
				}`}>
				<Dropdown
					content={categories}
					value='Categories'
					tab={TabIndex[ham.toString()]}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
						/>
					</svg>
				</Dropdown>
				<p className='table px-3 w-full cursor-pointer'>Categories</p>
				<Dropdown
					content={categories}
					value='Theme'
					tab={TabIndex[ham.toString()]}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
						/>
					</svg>
				</Dropdown>
			</nav>

			<div className='flex gap-3 items-center'>
				{/* <span
					id='heart'
					tabIndex={0}
					className='group relative cursor-pointer'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
						/>
					</svg>
					<span className='hidden group-focus:block group-hover:block bg-secondary text-white rounded-[4px] py-[1px] px-[3px] text-xs text-center z-50 absolute top-[110%] -left-3 after:content-[""] after:absolute after:bottom-full after:left-[40%] after:-ml[5px] after:border-[5px] after:border-solid border-tooltip'>
						Wishlist
					</span>
				</span> */}
				{/* <span
					id='cart'
					tabIndex={0}
					className='group relative cursor-pointer'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6 relative'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
						/>
					</svg>
					<span className='hidden group-focus:block group-hover:block bg-secondary text-white rounded-[4px] py-[1px] px-[3px] text-xs text-center z-50 absolute top-[110%] -left-1 after:content-[""] after:absolute after:bottom-full after:left-[40%] after:-ml[5px] after:border-[5px] after:border-solid border-tooltip'>
						Cart
					</span>
				</span> */}
				<Link href={'/login'} className='text-inherit contents '>
					<span
						id='user'
						tabIndex={0}
						className='group relative cursor-pointer p-1 rounded-full border-solid border-[1px] border-black dark:border-white'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
							/>
						</svg>
						<span className='hidden group-focus:block group-hover:block bg-secondary text-white rounded-[4px] py-[1px] px-[3px] text-xs text-center z-50 absolute top-[110%] left-0 dark:bg-white dark:text-black after:content-[""] after:absolute after:bottom-full after:left-[40%] after:-ml[5px] after:border-[5px] after:border-solid after:border-b-secondary after:border-x-transparent after:border-t-transparent dark:after:border-b-white'>
							User
						</span>
					</span>
				</Link>
				<ThemeSwitcher />
			</div>
			<span
				tabIndex={0}
				className={
					'group border-[1px] border-black dark:border-white py-3 px-2 relative bg-transparent shadow-md md:hidden'
				}
				onClick={() => setHam(!ham)}>
				<span
					className={`relative h-[2px] block w-5 bg-black dark:bg-white before:absolute before:top-[-6px] before:left-0 before:h-[2px] before:w-full before:bg-black before:dark:bg-white before:content-[""] before:transition-transform after:absolute after:top-[6px] after:left-0 after:h-[2px] after:w-full after:bg-black after:dark:bg-white after:content-[""] after:transition-transform  ${
						ham &&
						'duration-1000 before:-rotate-45 after:rotate-45 before:-translate-x-[5px] before:translate-y-[1px] before:transition-transform after:-translate-x-[5px] after:-translate-y-[1px] after:scale-x-75 before:scale-x-75 after:transition-transform'
					}`}></span>
				<span className='hidden group-focus:block group-hover:block bg-secondary text-white rounded-[4px] py-[1px] px-[3px] text-xs text-center z-50 absolute top-[110%] left-0 after:content-[""] after:absolute after:bottom-full after:left-[40%] after:-ml[5px] after:border-[5px] after:border-solid border-tooltip'>
					Menu
				</span>
			</span>
		</header>
	);
};

export default NavBar;
