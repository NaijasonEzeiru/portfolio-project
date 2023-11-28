import React, {
  type Dispatch,
  type ReactNode,
  createContext,
  useContext,
  useState,
  useReducer
} from 'react';

interface IAction {
  type: 'modify';
  payload: IFormData;
}

interface IFormData {
  category: number;
  subCategory: string;
  state: number;
  city: string;
  imgs: File[] | { value?: File }[] | { value?: File[] }[] | any;
  Headphones?: {
    brand?: string;
    colour?: string;
    condition?: string;
    connectivity?: string;
    formFactor?: string;
    model?: string;
    resistance?: string;
    type?: string;
  };
  Watches?: {
    brand?: string;
    gender?: string;
    title?: string;
    bandColour?: string;
    bandMaterial?: string;
    condition?: string;
    display?: string;
    features?: string[];
    movement?: string;
    style?: string[];
  };
  Shoes?: {
    brand?: string;
    colour?: string;
    condition?: string;
    type?: string;
    gender?: string;
    mainMaterial?: string;
    size?: string;
    soleMaterial?: string;
    title?: string;
  };
  Jewelries?: {
    brand?: string;
    colour?: string;
    condition?: string;
    type?: string;
    gender?: string;
    mainMaterial?: string;
    mainStone?: string;
    title?: string;
  };
  Computers?: {
    brand?: string;
    colour?: string;
    condition?: string;
    model?: string;
    type?: string;
    displaySize?: string;
    graphicCard?: string;
    numberOfCores?: string;
    processor?: string;
    RAM?: string;
    storageCapacity?: string;
    storageType?: string;
    operatingSystem?: string;
  };
  Vehicles?: {
    yearOfManufacture?: string;
    condition?: string;
    secondCondition?: string;
    transmission?: string;
    colour?: string;
    make?: string;
    mileage?: number | undefined;
    model?: string;
    keyFeatures?: string[];
  };
  desc: string;
  userName: string;
  phone: string;
  price: number;
  negotiable: string;
}

interface IFormContext {
  setPrevStep: (value: string) => void;
  handleNext: (value?: string) => void;
  dispatch: Dispatch<IAction>;
  step: string;
  prevStep: string;
  data: IFormData;
}

const formState = createContext<IFormContext>({
  handleNext: (value: string) => {},
  setPrevStep: (value: string) => {},
  step: 'first',
  prevStep: 'first',
  data: {
    category: -1,
    subCategory: '',
    state: -1,
    city: '',
    imgs: [{ value: undefined }],
    desc: '',
    userName: '',
    phone: '0',
    price: 0,
    negotiable: ''
  },
  dispatch: (value: {}) => {}
});

export const FormContext = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState('first');
  const [prevStep, setPrevStep] = useState('first');
  const [data, dispatch] = useReducer(reducer, {
    category: -1,
    subCategory: '',
    state: -1,
    city: '',
    imgs: [{ value: undefined }],
    desc: '',
    userName: '',
    phone: '0',
    price: 0,
    negotiable: ''
  });
  function reducer(data: IFormData, action: IAction) {
    const { type } = action;
    switch (type) {
      case 'modify': {
        return { ...action.payload };
      }
      default:
        return data;
    }
  }

  function handleNext(value: string = prevStep) {
    setStep(value);
  }
  console.log({ data });

  return (
    <formState.Provider
      value={{
        step,
        handleNext,
        data,
        dispatch,
        prevStep,
        setPrevStep
      }}>
      {children}
    </formState.Provider>
  );
};

export function useFormState() {
  return useContext(formState);
}
