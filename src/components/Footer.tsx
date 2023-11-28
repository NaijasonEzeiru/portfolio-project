'use client';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-100 px-3 py-11 text-black text-sm md:px-14 lg:px-32'>
      <div className='flex justify-between flex-col text-center md:flex-row'>
        {/* <div className='hidden md:block text-5xl'>
					<p className='uppercase'>BabaOloja</p>
				</div> */}
        <span className='py-2'>
          <div>
            <h4 className='text-base uppercase'>Categories</h4>
            <Link href={'#'}>
              <p>Vehicles</p>
            </Link>
            Fashion
            <Link href={'#'}>
              <p>Eletronics</p>
            </Link>
            <Link href={'#'}>
              <p>Fashion</p>
            </Link>
          </div>
        </span>
        <span className='py-2'>
          <div>
            <h4 className='text-base'>ABOUT US</h4>
            <p>Sitemap</p>
            <Link href={'/about'}>
              <p>About BabaOLoja</p>
            </Link>
            <p>Terms & Conditions</p>
          </div>
        </span>
        <span className='py-2'>
          <div>
            <h4 className='text-base'>CUSTOMERS SERVICES</h4>
            <p>Contact Us</p>
            <p>FAQ</p>
            <p>Transaction Dispute</p>
          </div>
        </span>
      </div>
      <div className='flex justify-between flex-col text-center mt-2'>
        <p>&copy; 2023 BabaOloja, Inc. All Rights Reserved.</p>{' '}
        <p>
          <Link href={'#'}>
            {' '}
            Designed By <span className='text-goldColor'>Chibby-k Ezeiru</span>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
