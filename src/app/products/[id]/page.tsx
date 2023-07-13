'use client';

import { apiAddress } from '@/utils/variables';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// export async function generateStaticParams() {
// 	const product = async () => {
// 		// console.log('whatever');
// 		const res = await fetch(`${apiAddress}/products/?id=${params.id}`, {
// 			method: 'GET',
// 			credentials: 'include'
// 		});
// 		const data = await res.json();
// 		// console.log('🚀 ~ product:', data);
// 	};
// }

const Product = ({ params }) => {
	const [productData, setProductData] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const product = async () => {
			// console.log('whatever');
			const res = await fetch(`${apiAddress}/products/?id=${params.id}`, {
				method: 'GET',
				credentials: 'include'
			});
			const data = await res.json();
			// console.log('🚀 ~ product:', data);
			if (data) {
				console.log('no product');
				setProductData(data);
				setLoading(false);
			} else {
				console.log('products');
				setLoading(false);
			}
		};
		product();
	}, []);

	return (
		<div className='min-h-[75vh] bg-white rounded-lg shadow-md text-black py-12 my-8 px-3 m-3 flex dark:bg-secondary dark:text-white md:mx-14 md:px-16 lg:mx-32'>
			{/* My product : {params.id}
			<p>{productData?.[0]?.category}</p> */}

			{productData.length > 0 &&
				productData.map((product, i) => (
					<div key={i} className='w-full h-full flex flex-col gap-3'>
						<div className='bg-red-700 w-full aspect-4/3 overflow-hidden'>
							<Image
								src={product.cloudinary_ids[1]}
								alt=''
								// alt={`Picture of a ${productName}`}
								width={171}
								height={125}
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='flex gap-2'>
							{product.cloudinary_ids.map((imgs, i) => (
								<div key={i} className=''>
									<div className='bg-red-700 w-full aspect-4/3 overflow-hidden'>
										<Image
											src={imgs}
											alt=''
											// alt={`Picture of a ${productName}`}
											width={171}
											height={125}
											className='h-full w-full object-cover'
										/>
									</div>
								</div>
							))}
						</div>
						<h2 className='text-xl font-bold capitalize'>
							{JSON.parse(product.specifications).title
								? JSON.parse(product.specifications).title
								: ''}
						</h2>
						<h5 className='text-2xl font-bold text-secondary dark:text-goldColor'>
							&#8358;{product.price.toLocaleString()}
						</h5>
						<p>
							{product.state}, {product.city}
						</p>
						<span className='flex items-center justify-start gap-3'>
							<p className='border-solid border-[1px] border-secondary dark:border-goldColor py-[7px] font-medium px-5 rounded-lg shadow-md'>
								+234{product.phone}
							</p>{' '}
							<button className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary dark:bg-goldColor text-white dark:text-black'>
								Call Seller
							</button>
						</span>
						<hr />
						<div className='flex gap-3 flex-col m-1'>
							<span>
								<p>Chat with seller</p>
								<input
									type='text'
									placeholder='Type a message'
									className='h-11 pl-1 w-full border-solid border-gray-500 border-[1px] rounded-lg bg-transparent dark:border-gray-400'
								/>
								{/* <textarea
									className='w-full border-solid border-gray-500 border-[1px] rounded-lg bg-transparent dark:border-gray-400'
									placeholder='Type a message'></textarea> */}
							</span>
							<span className='text-center w-full'>
								<button className='gap-1 w-full sm:w-max py-2 px-5 rounded-lg shadow-md bg-secondary dark:bg-goldColor text-white dark:text-black'>
									Send Message
								</button>
							</span>
						</div>
						<hr />
						<div>
							{Object.keys(
								JSON.parse(product.specifications)
							).map((key, i) => (
								<span
									key={i}
									className='py-3 flex items-center gap-1'>
									<p className='capitalize font-thin text-sm'>
										{key}:
									</p>
									<p className='capitalize text-base'>
										{JSON.parse(product.specifications)[
											key
										].toString()}
									</p>
								</span>
								// <p key={i}>
								// 	{key} :{' '}
								// 	{JSON.parse(product.specifications)[key]}
								// </p>
							))}
						</div>
						<hr />
						<div>
							<p>{product.description}</p>
						</div>
					</div>
				))}
		</div>
	);
};

export default Product;
