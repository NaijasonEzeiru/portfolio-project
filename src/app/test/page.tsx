'use client';
import React, { useState } from 'react';

const Test = () => {
	const [wet, setWet] = useState('');
	return (
		<div>
			<div className='relative w-64'>
				<input
					className='w-full p-[10px] border-solid border-[1px] border-black opacity-20 bg-white rounded-md outline-none color-black text-base transition-all invalid:border-red-600 peer'
					type='text'
					value={wet}
					onChange={(e) => {
						setWet(e.target.value);
					}}
					required
				/>
				<span className='absolute left-0 p-[10px] pointer-events-none text-base text-black opacity-20 uppercase transition-all peer-valid:text-secondary peer-valid:translate-x-[10px] peer-valid:-translate-y-[7px] peer-valid:text-[0.65rem] peer-valid:py-0 peer-valid:px-[10px] peer-valid:bg-white peer-valid:border-x-secondary peer-valid:tracking-tight peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight'>
					Product Name
				</span>
			</div>
		</div>
	);
};

export default Test;
