import { Suspense } from 'react';
import Hero from '../components/Hero';
import HomeProducts from '../components/productCard/HomeProducts';
import LoadingPage from '@/components/LoadingPage';

export default function Home() {
  return (
    <div className='min-h-screen w-full'>
      <Hero />
      <Suspense fallback={<LoadingPage />}>
        <HomeProducts />
      </Suspense>
    </div>
  );
}
