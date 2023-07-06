import React from 'react';

const VerticalProductCard = ({
	productName,
	productPrice,
	location
}: {
	productName: string;
	productPrice: number;
	location: string;
}) => {
	return (
		<div className='h-[300px] shadow-md text-black dark:text-white'>
			<div className='h-[92px] bg-gray-100 dark:bg-secondary w-full rounded-tr-lg rounded-tl-lg flex flex-col px-2 justify-center gap-[1px]'>
				<h5>{productName}</h5>
				<h5 className='text-amber-400 font-bold'>{productPrice}</h5>
				<p className='font-light text-xs'>{location}</p>
			</div>
			<div className='bg-secondary dark:bg-white flex justify-between gap-1 p-1 h-[207px] w-full flex-col rounded-bl-lg rounded-br-lg'>
				<div className='bg-red-700 w-full h-[370px]'></div>
				<div className='flex gap-1 h-full w-full'>
					<span className='flex gap-1 justify-between bg-red-700 w-full h-full'></span>
					<span className='flex gap-1 justify-between bg-red-700 w-full h-full'></span>
				</div>
			</div>
		</div>
	);
};

export default VerticalProductCard;
