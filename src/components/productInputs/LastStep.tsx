'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { places } from '@/utils/Jsons';
import { cat } from '@/utils/Jsons';
import { lastStepSchema, lastStepSchemaType } from '../../utils/schemas';
import {
  DescriptionInput,
  SelectInput,
  TextOrNumberInput
} from '@/components/productInputs/InputFields';
import { useFormState } from './FormContext';
import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../AuthContext';
import { apiAddress } from '@/utils/variables';
import { useRouter } from 'next/navigation';

const LastStep = () => {
  const [loading, setLoading] = useState(false);
  const isFirst = useRef(true);
  const { data, dispatch, handleNext, setPrevStep } = useFormState();
  const { user }: any = useContext(AuthContext);
  const router = useRouter();

  const yesOrNo = ['Yes', 'No'];

  // useEffect(() => {
  //   if (!isFirst.current) {
  //     alert('effect');
  //     completeSubmit();
  //   }
  // }, [data, completeSubmit]);

  // useEffect(() => {
  //   isFirst.current = false;
  // }, []);

  const { desc = '', price = undefined, negotiable = '' } = data;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<lastStepSchemaType>({
    defaultValues: {
      desc,
      price,
      userName: `${user.firstName} ${user.lastName}`,
      phone: user.phone,
      negotiable
    },
    mode: 'onChange',
    resolver: zodResolver(lastStepSchema)
  });

  const fields = watch();

  const finalSubmit = async (v: lastStepSchemaType) => {
    setLoading(true);
    dispatch({ payload: { ...data, ...v }, type: 'modify' });
    const formInputs = new FormData();
    for (let i = 0; i < data.imgs.length; i++) {
      formInputs.append('images[]', data.imgs[i]?.value?.[0]);
    }
    formInputs.append('desc', v.desc);
    switch (data.subCategory) {
      case 'Cars':
      case 'Motorcycles':
      case 'Buses':
      case 'Trucks and Trailers':
        formInputs.append('dynamic', JSON.stringify(data.Vehicles));
        break;
      case 'Headphones':
        formInputs.append('dynamic', JSON.stringify(data.Headphones));
        break;
      case 'Computers':
        formInputs.append('dynamic', JSON.stringify(data.Computers));
        break;
      case 'Jewelries':
        formInputs.append('dynamic', JSON.stringify(data.Jewelries));
        break;
      case 'Shoes':
        formInputs.append('dynamic', JSON.stringify(data.Shoes));
        break;
      case 'Watches':
        formInputs.append('dynamic', JSON.stringify(data.Watches));
        break;
    }
    formInputs.append('city', data.city);
    formInputs.append('negotiable', v.negotiable);
    formInputs.append('phone', v.phone.toString());
    formInputs.append('price', v.price.toString());
    formInputs.append('state', places[+data.state].name);
    formInputs.append('subCategory', data.subCategory);
    formInputs.append('userName', v.userName);
    formInputs.append('category', cat[+data.category].name);
    formInputs.append('userId', user.id);
    const res = await fetch(`${apiAddress}/products/add-new-product`, {
      method: 'POST',
      body: formInputs
    });
    const response = await res.json();
    console.log(response);
    if (response?.message?.id) {
      alert('success');
      router.push('/');
      setLoading(false);
    } else {
      alert('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <button
        className='text-[#8692A6] font-semibold flex gap-1 items-center mb-5'
        aria-label='go back'
        onClick={() => {
          handleNext();
          setPrevStep('first');
        }}>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          aria-hidden
          xmlns='http://www.w3.org/2000/svg'>
          <g id='icon/navigation/arrow_back_ios_24px'>
            <path
              id='icon/navigation/arrow_back_ios_24px_2'
              d='M14.8625 3.225L13.3791 1.75L5.13745 10L13.3875 18.25L14.8625 16.775L8.08745 10L14.8625 3.225Z'
              fill='#8692A6'
            />
          </g>
        </svg>
        <p>Back</p>
      </button>
      <form
        onSubmit={handleSubmit(finalSubmit)}
        className='flex flex-col gap-7 text-black '>
        <DescriptionInput
          register={register('desc')}
          errors={errors?.desc?.message}
          fields={fields?.desc?.length > 0}
          placeholder='description'
          type='text'
        />
        <TextOrNumberInput
          register={register('price')}
          errors={errors?.price?.message}
          fields={fields?.price > 0}
          placeholder='price'
          type='number'
        />
        <SelectInput
          items={yesOrNo}
          register={register('negotiable')}
          errors={errors?.negotiable?.message}
          placeholder='Negotiable'
          fields={fields?.negotiable?.length > 0}
        />
        <div className='relative w-full'>
          <input
            className={`w-full p-[10px] border-solid border-[1px] border-opacity-20 bg-white rounded-md outline-0  text-base transition-transform invalid:border-red-600 peer isValid`}
            type='text'
            {...register('phone')}
            aria-invalid={!!errors}
            value={user.phone}
            disabled
          />
          <span className='absolute left-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 '>
            {' '}
            Phone Number
          </span>
          <span className='text-red-400  text-xs'>{errors.phone?.message}</span>
        </div>
        <div className='relative w-full'>
          <input
            className={`w-full p-[10px] border-solid border-[1px] border-opacity-20 bg-white rounded-md outline-0  text-base transition-transform invalid:border-red-600 peer isValid`}
            type='text'
            {...register('userName')}
            aria-invalid={!!errors}
            value={`${user.firstName} ${user.lastName}`}
            disabled
          />
          <span className='absolute left-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 '>
            {' '}
            Name
          </span>
          <span className='text-red-400  text-xs'>
            {errors.userName?.message}
          </span>
        </div>
        <button
          // type='button'
          onClick={() => finalSubmit}
          disabled={isSubmitting}
          className='flex disabled:bg-loadingSecondary gap-2 py-2 px-5 rounded-lg shadow-md bg-secondary text-white  w-max m-auto'>
          <div className={loading ? 'lds' : 'hidden'}>
            <div className='bg-white'></div>
            <div className='bg-white'></div>
            <div className='bg-white'></div>
          </div>
          <p>Post Ad</p>
        </button>
      </form>
    </div>
  );
};

export default LastStep;
