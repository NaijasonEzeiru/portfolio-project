import Image from 'next/image';
import Link from 'next/link';

export default function HorizontalProductsCard({
  productName,
  productPrice,
  location,
  imgs,
  id
}: {
  productName: string;
  productPrice: number;
  location: string;
  imgs: string[];
  id: string;
}) {
  return (
    <Link href={`/products/${id}`} className='text-black flex items-center'>
      <div className='h-[117px] relative'>
        <Image
          alt={productName}
          src={imgs[0]}
          width={175}
          height={117}
          className='object-cover w-full h-full rounded-s-md'
        />
      </div>
      <span className='h-[117px] w-full flex flex-col px-2 justify-center gap-[1px]'>
        <h5 className='truncate'>{productName}</h5>
        <h5 className='text-secondary font-bold'>
          &#8358;{productPrice.toLocaleString()}
        </h5>
        <p className='font-light text-xs'>{location}</p>
      </span>
    </Link>
  );
}
