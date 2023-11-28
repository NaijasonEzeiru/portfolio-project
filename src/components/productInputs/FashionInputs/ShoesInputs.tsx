import React from 'react';
import { SelectInput, TextOrNumberInput } from '../InputFields';
import { useFormState } from '../FormContext';
import { ShoesSchema, ShoesSchemaType } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const ShoesInput = () => {
  const { handleNext, dispatch, setPrevStep, data } = useFormState();
  var shoeTypes = [
    'Sneakers',
    'Boots',
    'Sandals',
    'Loafers',
    'Flats',
    'Heels',
    'Oxfords',
    'Athletic Shoes',
    'Slippers',
    'Wedges',
    'Other'
  ];
  var shoeMaterials = [
    'Leather',
    'Canvas',
    'Suede',
    'Rubber',
    'Mesh',
    'Synthetic',
    'Knit',
    'Nylon',
    'Denim',
    'Cork',
    'Other'
  ];
  const sizeArr = Array.from({ length: 47 - 34 }, (_, i) => 34 + i);

  const shoeSoleMaterials = [
    'Rubber',
    'EVA (Ethylene-vinyl acetate)',
    'TPU (Thermoplastic polyurethane)',
    'PU (Polyurethane)',
    'Leather',
    'Cork',
    'Gum',
    'Foam',
    'Synthetic',
    'Carbon Fiber',
    'Plastic',
    'Wood',
    'Latex',
    'Gel',
    'Crepe',
    'Vibram',
    'Other'
  ];

  const conditions = ['Brand New', 'Used'];

  const genderArr = ['Male', 'Female', 'Unisex'];

  const {
    brand = '',
    colour = '',
    condition = '',
    gender = '',
    mainMaterial = '',
    size = '',
    soleMaterial = '',
    title = '',
    type = ''
  } = { ...data.Shoes };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ShoesSchemaType>({
    defaultValues: {
      brand,
      colour,
      condition,
      type,
      gender,
      mainMaterial,
      size,
      soleMaterial,
      title
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(ShoesSchema)
  });

  const fields = watch();

  const submit = async (v: ShoesSchemaType) => {
    dispatch({ payload: { ...data, Shoes: v }, type: 'modify' });
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
        register={register('title')}
        errors={errors?.title?.message}
        fields={fields?.title?.length > 0}
        placeholder='title'
        type='text'
      />
      <TextOrNumberInput
        register={register('brand')}
        errors={errors?.brand?.message}
        fields={fields?.brand?.length > 0}
        placeholder='brand'
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
        items={sizeArr}
        register={register('size')}
        errors={errors?.size?.message}
        fields={fields?.size?.length > 0}
        placeholder='size'
      />
      <SelectInput
        items={genderArr}
        register={register('gender')}
        errors={errors?.gender?.message}
        fields={fields?.gender?.length > 0}
        placeholder='gender'
      />
      <SelectInput
        items={shoeTypes}
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
        items={shoeMaterials}
        register={register('mainMaterial')}
        errors={errors?.mainMaterial?.message}
        fields={fields?.mainMaterial?.length > 0}
        placeholder='main material'
      />
      <SelectInput
        items={shoeSoleMaterials}
        register={register('soleMaterial')}
        errors={errors?.soleMaterial?.message}
        fields={fields?.soleMaterial?.length > 0}
        placeholder='Sole material'
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

export default ShoesInput;
