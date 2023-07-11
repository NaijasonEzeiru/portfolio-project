import React, {
	Dispatch,
	ReactNode,
	createContext,
	useContext,
	useState,
	SetStateAction
} from 'react';

interface IFormData {
	category: number;
	subCategory: string;
	state: number;
	city: string;
	imgs: File[] | { value?: File }[] | { value?: File[] }[];
	dynamic: {};
	desc: string;
	userName: string;
	phone: string;
	price: number;
	negotiable: string;
}

interface IFormContext {
	handleBack: (value: string) => void;
	handleNext: (value: string) => void;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	step: string;
	formData: IFormData;
}

const formState = createContext<IFormContext>({
	handleBack: (value: string) => {},
	handleNext: (value: string) => {},
	step: 'first',
	formData: {
		category: 0,
		subCategory: '',
		state: 0,
		city: '',
		imgs: undefined,
		dynamic: {},
		desc: '',
		userName: '',
		phone: '0',
		price: 0,
		negotiable: ''
	},
	setFormData: (value: {}) => {}
});

export const FormContext = ({ children }: { children: ReactNode }) => {
	const [step, setStep] = useState('first');
	const [formData, setFormData] = useState({
		category: 0,
		subCategory: '',
		state: 0,
		city: '',
		imgs: undefined,
		dynamic: {},
		desc: '',
		userName: '',
		phone: '0',
		price: 0,
		negotiable: ''
	});

	function handleNext(value: string) {
		setStep(value);
	}
	console.log({ formData });
	function handleBack(value: string) {
		setStep(value);
	}

	return (
		<formState.Provider
			value={{ step, handleBack, handleNext, formData, setFormData }}>
			{children}
		</formState.Provider>
	);
};

export function useFormState() {
	return useContext(formState);
}
