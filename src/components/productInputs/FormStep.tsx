import dynamic from 'next/dynamic';
import FirstStep from './FirstStep';
import { useFormState } from './FormContext';
import LoadingPage from '../LoadingPage';

export function FormStep() {
	const { step } = useFormState();
	const VehiclesInput = dynamic(() => import('./VehiclesInputs'), {
		loading: () => <LoadingPage />
	});
	const LastStep = dynamic(() => import('./LastStep'), {
		loading: () => <LoadingPage />
	});
	const LaptopsAndComputers = dynamic(
		() => import('./ElectronicsInputs/ComputersAndLaptops')
	);
	const Headphones = dynamic(() => import('./ElectronicsInputs/Headphones'), {
		loading: () => <LoadingPage />
	});
	const Jewelries = dynamic(() => import('./FashionInputs/JewelriesInput'), {
		loading: () => <LoadingPage />
	});
	const Shoes = dynamic(() => import('./FashionInputs/ShoesInputs'), {
		loading: () => <LoadingPage />
	});
	const Watches = dynamic(() => import('./FashionInputs/watches'), {
		loading: () => <LoadingPage />
	});

	switch (step) {
		case 'Cars':
		case 'Motorcycles':
		case 'Buses':
		case 'Trucks and Trailers':
			return <VehiclesInput />;
		case 'Headphones':
			return <Headphones />;
		case 'Laptops and Computers':
			return <LaptopsAndComputers />;
		case 'Jewelries':
			return <Jewelries />;
		case 'Shoes':
			return <Shoes />;
		case 'Watches':
			return <Watches />;
		case 'last':
			return <LastStep />;
		default:
			return <FirstStep />;
	}
}
