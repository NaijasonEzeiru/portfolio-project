const Hero = () => {
  return (
    <div className='bg-gray-100 text-black py-14 px-3 rounded-br-[100px] md:px-14 lg:px-32 lg:rounded-none'>
      <span className='flex gap-4 flex-col'>
        <h2 className='text-3xl'>
          STAY FREE FROM SCAMS. USE OUR{' '}
          <span className='text-secondary font-bold'>SAFE ESCROW</span> PAYMENT
          SERVICE
        </h2>
        <p className='text-base'>
          The Safest Way to Buy and Sell Online! We combine the convenience of a
          classified ads website with the security of an escrow service. Our
          platform connects buyers and sellers, while our robust escrow system
          ensures safe transactions. Simply initiate a transaction, and we hold
          the funds until both parties are satisfied. Our dedicated team and
          encryption technology provide peace of mind. Ise BabaOloja today for a
          secure and reliable online buying and selling experience.
        </p>
        <span>
          <button className='text-secondary border-secondary flex gap-1 py-2 px-5 rounded-lg border-solid shadow-md border-[1px]'>
            Give it a try
          </button>
        </span>
      </span>
    </div>
  );
};

export default Hero;
