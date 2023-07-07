'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);

	const { theme, setTheme } = useTheme();

	const switchTheme = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<>
			<span
				className='relative -top-1 group cursor-pointer w-7'
				tabIndex={0}
				onClick={switchTheme}>
				<span className='absolute bg-secondary w-7 h-3 rounded-lg dark:bg-white'></span>
				<span className='absolute bg-white rounded-full h-4 w-4 left-0 -top-[2px] dark:bg-secondary dark:left-3 transition-all duration-499 border-solid border-secondary dark:border-white border-[1px]'></span>
				<span className='hidden group-focus:block group-hover:block bg-secondary text-white rounded-[4px] py-[1px] px-[3px] text-xs text-center z-50 absolute -left-5 dark:bg-white dark:text-black after:content-[""] after:absolute after:bottom-full after:left-[40%] after:-ml[5px] after:border-[5px] after:border-solid after:border-b-secondary after:border-x-transparent after:border-t-transparent dark:after:border-b-white top-5'>
					<p className='w-max'>Theme switch</p>
				</span>
			</span>
		</>
	);
};

export default ThemeSwitcher;
