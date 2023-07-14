import { useEffect, useState } from 'react';
import { apiAddress } from '@/utils/variables';
import VerticalProductCard from './VerticalProductCard';
import LoadingPage from '../LoadingPage';

const HomeProducts = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const products = async () => {
			// console.log('whatever');
			const res = await fetch(`${apiAddress}/products`, {
				method: 'GET',
				credentials: 'include'
			});
			const data = await res.json();
			console.log('🚀 ~ product:', data);
			if (data) {
				console.log('no product');
				setAllProducts(data);
				setLoading(false);
			} else {
				console.log('products');
				setLoading(false);
			}
		};
		products();
	}, []);

	return loading ? (
		<LoadingPage />
	) : (
		<div className='px-3 py-11 grid gap-x-2 gap-y-3 gtc grid-flow-row md:px-14 lg:px-32'>
			{allProducts.length > 0 &&
				allProducts.map((product, i) => (
					<VerticalProductCard
						productName={
							JSON.parse(product?.specifications).title
								? JSON.parse(product?.specifications).title
								: JSON.parse(product?.specifications).make
								? `${
										JSON.parse(product?.specifications).make
								  } ${
										JSON.parse(product?.specifications)
											.model
								  } ${
										JSON.parse(product?.specifications)
											.yearOfManufacture
								  }`
								: `${
										JSON.parse(product.specifications).brand
								  } ${
										JSON.parse(product?.specifications)
											?.model
								  }`
						}
						location={product.state + ' ' + product.city}
						productPrice={+product.price}
						key={i}
						imgs={product.cloudinary_ids}
						id={product.id}
					/>
				))}
		</div>
	);
};

export default HomeProducts;
