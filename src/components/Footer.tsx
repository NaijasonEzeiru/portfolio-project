'use client';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<footer className='bg-gray-100 dark:bg-secondary px-3 py-11 text:black dark:text-white text-sm md:px-14 lg:px-32'>
			<div className='flex justify-between  flex-col text-center md:flex-row'>
				<div className='hidden md:block'>
					<p className=''>BabaOloja</p>
				</div>
				<span className='py-2'>
					<div>
						<h4 className='text-base'>COLLECTIONS</h4>
					</div>
				</span>
				<span className='py-2'>
					<div>
						<h4 className='text-base'>ABOUT US</h4>
						<p>Our Producers</p>
						<p>FAQ</p>
						<p>Sitemap</p>
						<p>About Us</p>
						<p>Terms & Conditions</p>
					</div>
				</span>
				<span className='py-2'>
					<div>
						<h4 className='text-base'>CUSTOMERS SERVICES</h4>
						<p>Contact Us</p>
						<p>Track Your Order</p>
						<p>Product Care & Repair</p>
						<p>Shipping & Returns</p>
					</div>
				</span>
			</div>
			<div className='flex justify-between flex-col md:flex-row text-center'>
				<p>&copyright 2022 Swagger, Inc. All Rights Reserved.</p>{' '}
				<p>
					<Link href={'#'}> Designed By Chibby-k Ezeiru</Link>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
