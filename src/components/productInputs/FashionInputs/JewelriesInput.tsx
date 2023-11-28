import React from 'react';
import { SelectInput, TextOrNumberInput } from '../InputFields';
import { useFormState } from '../FormContext';
import { JewelriesSchema, JewelriesSchemaType } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const JewelriesInput = () => {
  const { handleNext, data, dispatch, setPrevStep } = useFormState();
  const jewelryTypes = [
    'Necklace',
    'Ring',
    'Earrings',
    'Bracelet',
    'Anklet',
    'Brooch',
    'Pendant',
    'Charm',
    'Cufflinks',
    'Bangle',
    'Choker',
    'Body Jewelry',
    'Toe Ring',
    'Hairpin',
    'Tie Clip',
    'Other'
  ];
  const jewelryMaterials = [
    'Gold',
    'Silver',
    'Platinum',
    'Diamond',
    'Pearl',
    'Ruby',
    'Emerald',
    'Sapphire',
    'Amethyst',
    'Topaz',
    'Garnet',
    'Opal',
    'Turquoise',
    'Coral',
    'Jade',
    'Quartz',
    'Onyx',
    'Agate',
    'Moonstone',
    'Lapis Lazuli',
    'other'
  ];

  var jewelryStones = [
    'Diamond',
    'Ruby',
    'Sapphire',
    'Emerald',
    'Amethyst',
    'Topaz',
    'Garnet',
    'Opal',
    'Aquamarine',
    'Pearl',
    'Peridot',
    'Citrine',
    'Turquoise',
    'Tanzanite',
    'Tourmaline',
    'Moonstone',
    'Jade',
    'Lapis Lazuli',
    'Onyx',
    'Agate',
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
    mainStone = '',
    title = '',
    type = ''
  } = { ...data.Jewelries };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<JewelriesSchemaType>({
    defaultValues: {
      brand,
      colour,
      condition,
      type,
      gender,
      mainMaterial,
      mainStone,
      title
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(JewelriesSchema)
  });

  const fields = watch();

  const submit = async (v: JewelriesSchemaType) => {
    dispatch({ type: 'modify', payload: { ...data, Jewelries: v } });
    setPrevStep(data.subCategory);
    handleNext('last');
  };

  return (
    <div className=''>
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
        <SelectInput
          register={register('gender')}
          errors={errors?.gender?.message}
          fields={fields?.gender?.length > 0}
          placeholder='gender'
          items={genderArr}
        />
        <TextOrNumberInput
          register={register('colour')}
          errors={errors?.colour?.message}
          fields={fields?.colour?.length > 0}
          placeholder='colour'
          type='text'
        />
        <SelectInput
          items={jewelryTypes}
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
          items={jewelryMaterials}
          register={register('mainMaterial')}
          errors={errors?.mainMaterial?.message}
          fields={fields?.mainMaterial?.length > 0}
          placeholder='main material'
        />
        <SelectInput
          items={jewelryStones}
          register={register('mainStone')}
          errors={errors?.mainStone?.message}
          fields={fields?.mainStone?.length > 0}
          placeholder='main Stone'
        />
        <button
          type='submit'
          disabled={isSubmitting}
          className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary text-white  w-max m-auto disabled:bg-red-600'>
          Next
        </button>
      </form>
    </div>
  );
};

export default JewelriesInput;
