import React from 'react';
import { SelectInput, TextOrNumberInput } from '../InputFields';
import { useFormState } from '../FormContext';
import { HeadphonesSchema, HeadphonesSchemaType } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const Headphones = () => {
  const { handleNext, data, dispatch, setPrevStep } = useFormState();
  const connectType = ['Wired', 'Wireless', 'Wired/Wireless'];
  const formType = ['Ear Hook', 'Headband', 'In-Ear Only', 'NeckBand'];
  const conditions = ['Brand New', 'Not Working', 'Refurblished', 'Used'];
  const types = ['In-Ear', 'On-Ear', 'Over-Ear'];
  const {
    brand = '',
    colour = '',
    condition = '',
    connectivity = '',
    formFactor = '',
    model = '',
    resistance = '',
    type = ''
  } = { ...data.Headphones };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<HeadphonesSchemaType>({
    defaultValues: {
      brand,
      colour,
      condition,
      connectivity,
      formFactor,
      model,
      resistance,
      type
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(HeadphonesSchema)
  });

  const fields = watch();

  const submit = async (v: HeadphonesSchemaType) => {
    dispatch({ payload: { ...data, Headphones: v }, type: 'modify' });
    setPrevStep(data.subCategory);
    handleNext('last');
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className='flex flex-col gap-7 text-black '>
      <button
        className='text-[#8692A6] font-semibold flex gap-1 items-center w-fit'
        aria-label='go back'
        type='button'
        onClick={() => {
          handleNext();
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
      <TextOrNumberInput
        register={register('brand')}
        errors={errors?.brand?.message}
        fields={fields?.brand?.length > 0}
        placeholder='brand'
        type='text'
      />
      <TextOrNumberInput
        register={register('model')}
        errors={errors?.model?.message}
        fields={fields?.model?.length > 0}
        placeholder='model'
        type='text'
      />
      <TextOrNumberInput
        register={register('resistance')}
        errors={errors?.resistance?.message}
        fields={fields?.resistance?.length > 0}
        placeholder='resistance (Ohm)'
        type='text'
      />

      <TextOrNumberInput
        register={register('colour')}
        errors={errors?.colour?.message}
        fields={fields?.colour?.length > 0}
        placeholder='colour'
        type='text'
      />

      <SelectInput
        items={types}
        register={register('type')}
        errors={errors?.type?.message}
        fields={fields?.type?.length > 0}
        placeholder='type'
      />
      <SelectInput
        items={conditions}
        register={register('condition')}
        errors={errors?.condition?.message}
        fields={fields?.condition?.length > 0}
        placeholder='condition'
      />
      <SelectInput
        items={formType}
        register={register('formFactor')}
        errors={errors?.formFactor?.message}
        fields={fields?.formFactor?.length > 0}
        placeholder='Form Factor'
      />
      <SelectInput
        items={connectType}
        register={register('connectivity')}
        errors={errors?.connectivity?.message}
        fields={fields?.connectivity?.length > 0}
        placeholder='connectivity'
      />
      <button
        type='submit'
        disabled={isSubmitting}
        className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary text-white  w-max m-auto disabled:bg-red-600'>
        Next
      </button>
    </form>
  );
};

export default Headphones;
