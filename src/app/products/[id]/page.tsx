import { ImgCarousel } from '@/components/ImgCarousel';
import { apiAddress } from '@/utils/variables';

const Product = async ({ params }) => {
  // const [msg, setMsg] = useState('');

  const res = await fetch(`${apiAddress}/products/${params.id}`, {
    method: 'GET',
    credentials: 'include'
  });
  const productData = await res.json();

  const productName = JSON.parse(productData?.specifications).title
    ? JSON.parse(productData?.specifications).title
    : JSON.parse(productData?.specifications).make
    ? `${JSON.parse(productData?.specifications).make} ${
        JSON.parse(productData?.specifications).model
      } ${JSON.parse(productData?.specifications).yearOfManufacture}`
    : `${JSON.parse(productData.specifications).brand} ${
        JSON.parse(productData?.specifications)?.model
      }`;

  return (
    <div className='min-h-[75vh] bg-white rounded-lg shadow-md text-black py-12 my-8 px-3 m-3 flex md:mx-14 md:px-16 lg:mx-32'>
      <div className='w-full h-full flex flex-col gap-3'>
        <ImgCarousel imgs={productData?.cloudinary_ids} alt={productName} />
        <h2 className='text-xl font-bold capitalize'>{productName}</h2>
        <h5 className='text-2xl font-bold text-secondary'>
          &#8358;{productData?.price.toLocaleString()}
        </h5>
        <p>
          {productData?.state}, {productData?.city}
        </p>
        <span className='flex items-center justify-start gap-3'>
          <p className='border-solid border-[1px] border-secondary py-[7px] font-medium px-5 rounded-lg shadow-md'>
            +234{productData?.phone}
          </p>{' '}
          <a href={`tel:+234${productData.phone}`}>
            <button className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary text-white'>
              Call Seller
            </button>
          </a>
        </span>
        <hr />
        <div className='flex gap-3 flex-col m-1'>
          <span>
            <p>Chat with seller</p>
            <textarea
              className='w-full h-32 border-solid border-gray-500 border-[1px] rounded-lg bg-transparent'
              placeholder='Type a message'
              // value={msg}
              // onChange={(e) => setMsg(e.target.value)}
            ></textarea>
          </span>
          <span className='text-center w-full'>
            <button
              // onClick={() => setMsg('')}
              className='gap-1 w-full sm:w-max py-2 px-5 rounded-lg shadow-md bg-secondary text-white'>
              Send Message
            </button>
          </span>
        </div>
        <hr />
        <div>
          {Object.keys(JSON.parse(productData?.specifications)).map(
            (key, i) => (
              <span key={i} className='py-3 flex flex-col gap-1'>
                <p className='capitalize font-thin text-sm'>{key}:</p>
                <p className='capitalize text-base'>
                  {JSON.parse(productData?.specifications)[key].toString()}
                </p>
              </span>
              // <p key={i}>
              // 	{key} :{' '}
              // 	{JSON.parse(productData?.specifications)[key]}
              // </p>
            )
          )}
        </div>
        <hr />
        {productData?.description && (
          <div>
            <p className='capitalize font-thin text-sm'>Description:</p>
            <p>{productData?.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
