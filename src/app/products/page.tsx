'use client';

import AuthContext from '@/components/AuthContext';
import LoadingPage from '@/components/LoadingPage';
import { FormContext } from '@/components/productInputs/FormContext';
import { FormStep } from '@/components/productInputs/FormStep';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const AddNewProduct = () => {
	const { user, authChecking }: any = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		// TODO: Display "You are notlogged in"
		user || authChecking || router.push('/login');
	}, [user, authChecking]);

	return (
		<div className='min-h-[75vh] bg-white rounded-lg shadow-md text-black text-center py-12 my-8 px-3 m-3 flex items-center dark:bg-secondary dark:text-white md:mx-14 md:px-16 lg:mx-32'>
			{authChecking || !user ? (
				<LoadingPage />
			) : (
				<div className='flex gap-11 flex-col w-full'>
					<h2 className='tac'>Add Product</h2>
					<FormContext>
						<FormStep />
					</FormContext>
				</div>
			)}
		</div>
	);
};

export default AddNewProduct;
