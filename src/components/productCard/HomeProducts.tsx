import { apiAddress } from '@/utils/variables';
import HorizontalProductsCard from './HorizontalProductsCard';

async function getProducts() {
  const res = await fetch(`${apiAddress}/products`);
  if (res.ok) {
    return await res.json();
  }
  return [];
}

const HomeProducts = async () => {
  let allProducts = await getProducts();

  return (
    <div className='px-3 py-11 gap-x-2 gap-y-4 grid-container grid md:px-14 lg:px-32'>
      {allProducts.length > 0 &&
        allProducts.map((product, i) => (
          <HorizontalProductsCard
            key={i}
            productName={
              JSON.parse(product?.specifications).title
                ? JSON.parse(product?.specifications).title
                : JSON.parse(product?.specifications).make
                ? `${JSON.parse(product?.specifications).make} ${
                    JSON.parse(product?.specifications).model
                  } ${JSON.parse(product?.specifications).yearOfManufacture}`
                : `${JSON.parse(product.specifications).brand} ${
                    JSON.parse(product?.specifications)?.model
                  }`
            }
            location={product.state + ', ' + product.city}
            productPrice={+product.price}
            // key={i}
            imgs={product.cloudinary_ids}
            id={product.id}
          />
        ))}
    </div>
  );
};

export default HomeProducts;
