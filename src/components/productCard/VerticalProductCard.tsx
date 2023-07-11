import Image from 'next/image';
import React from 'react';

const VerticalProductCard = ({
	productName,
	productPrice,
	location,
	imgs
}: {
	productName: string;
	productPrice: number;
	location: string;
	imgs: string[];
}) => {
	return (
		<div
			className='h-[300px] shadow-md text-black dark:text-white'
			tabIndex={0}>
			<div className='h-[92px] bg-gray-100 dark:bg-secondary w-full rounded-tr-lg rounded-tl-lg flex flex-col px-2 justify-center gap-[1px]'>
				<h5 className='truncate'>{productName}</h5>
				<h5 className='text-amber-400 font-bold'>
					&#8358;{productPrice.toLocaleString()}
				</h5>
				<p className='font-light text-xs'>{location}</p>
			</div>
			<div className='bg-gray-100 dark:bg-white flex justify-between gap-1 p-1 h-[207px] w-full flex-col rounded-bl-lg rounded-br-lg'>
				<div className='bg-red-700 w-full h-[370px] overflow-hidden'>
					<Image
						src={imgs[0]}
						alt={`Picture of a ${productName}`}
						width={171}
						height={126}
						className='h-full w-full object-cover'
					/>
				</div>
				<div className='flex gap-1 h-full w-full'>
					<span className='flex gap-1 justify-between bg-red-700 w-full h-full'>
						<Image
							src={imgs[1]}
							alt={`Picture of a ${productName}`}
							width={83}
							height={68}
							className='h-full w-full object-cover'
						/>
					</span>
					<span className='flex gap-1 justify-between bg-red-700 w-full h-full'>
						<Image
							src={imgs[2]}
							alt={`Picture of a ${productName}`}
							width={83}
							height={68}
							className='h-full w-full object-cover'
						/>
					</span>
				</div>
			</div>
		</div>
	);
};

export default VerticalProductCard;
