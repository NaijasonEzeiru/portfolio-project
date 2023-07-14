import Link from 'next/link';
import { useState } from 'react';

const Dropdown = ({ value, content, children, tab }: any) => {
	const [dropdown, setDropdown] = useState(false);
	enum TabIndex {
		false = -1,
		true
	}

	return (
		<span className='relative'>
			<span
				className='flex text-sm gap-1 px-3 items-center'
				onClick={() => setDropdown(!dropdown)}
				tabIndex={tab}>
				{children}
				<p>{value}</p>

				<span
					className={
						dropdown
							? 'rotate-180 transition-transform'
							: 'rotate-0 transition-transform'
					}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-4 h-4'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19.5 8.25l-7.5 7.5-7.5-7.5'
						/>
					</svg>
				</span>
			</span>
			<div
				className={`flex flex-col gap-1 relative top-1 max-h-0 transition-all ml-1 overflow-hidden md:top-8 md:-left-2 px-8 md:absolute md:bg-gray-100 md:w-32 dark:md:bg-secondary md:dark:text-goldColor md:dark:border-white md:border-t-0 md:dark:border-t-0 border-black border-solid border-t-0 md:border-[1px] opacity-0 duration-500 md:text-gray-600 ${
					dropdown && '!max-h-52 !opacity-100 pb-4'
				}`}>
				{content.map((item: string, i: number) => (
					<div key={i}>
						<Link
							href={item}
							tabIndex={TabIndex[dropdown.toString()]}>
							{item}
						</Link>
					</div>
				))}
			</div>
		</span>
	);
};

export default Dropdown;
