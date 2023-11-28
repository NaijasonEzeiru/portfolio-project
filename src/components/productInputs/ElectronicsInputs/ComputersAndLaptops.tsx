import React from 'react';
import { SelectInput, TextOrNumberInput } from '../InputFields';
import { useFormState } from '../FormContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  LaptopAndComputersSchema,
  LaptopAndComputersSchemaType
} from '@/utils/schemas';

const ComputersAndLaptops = () => {
  const { handleNext, data, dispatch, setPrevStep } = useFormState();
  const conditions = ['Brand New', 'Not Working', 'Refurblished', 'Used'];
  const types = ['Desktop Computer', 'Laptop'];
  const storageTypes = ['eMMC', 'HDD', 'HDD+SSD', 'SSHD (Hybrid)', 'SSHD+SSD'];
  const cores = [
    'Single Core',
    'Dual Core',
    'Quad Core',
    'Octa Core',
    'Hexa Core'
  ];
  const Processors = [
    'Intel Core i9',
    'Intel Core i7',
    'Intel Core i5',
    'Intel Core i3',
    'AMD Ryzen 9',
    'AMD Ryzen 7',
    'AMD Ryzen 5',
    'AMD Ryzen 3',
    'Apple M1',
    'Apple M2',
    'Qualcomm Snapdragon',
    'Intel Pentium Gold',
    'Intel Celeron',
    'AMD Athlon',
    'AMD A-Series',
    'Intel Xeon',
    'Intel Atom',
    'Samsung Exynos',
    'NVIDIA Tegra',
    'Huawei Kirin',
    'MediaTek Dimensity',
    'Qualcomm Snapdragon',
    'Qualcomm Snapdragon'
  ];

  const RAMsList = [
    '4GB DDR4',
    '8GB DDR4',
    '12GB DDR4',
    '16GB DDR4',
    '32GB DDR4',
    '64GB DDR4',
    '4GB DDR3',
    '8GB DDR3',
    '16GB DDR3',
    '32GB DDR3',
    '64GB DDR3',
    '128GB DDR3',
    '4GB LPDDR4',
    '8GB LPDDR4',
    '12GB LPDDR4',
    '16GB LPDDR4',
    '32GB LPDDR4',
    '64GB LPDDR4'
  ];

  const StorageCapacities = [
    '16GB',
    '32GB',
    '64GB',
    '128GB',
    '256GB',
    '512GB',
    '1TB',
    '2TB'
  ];

  const DisplaySizes = [
    '11.6 inches',
    '13.3 inches',
    '14 inches',
    '15.6 inches',
    '17.3 inches',
    '12.5 inches',
    '15 inches',
    '13 inches',
    '12 inches',
    '14.1 inches',
    '16 inches',
    '17 inches',
    '10.1 inches',
    '18.4 inches',
    '11 inches',
    '13.9 inches',
    '15.4 inches',
    '13.5 inches',
    '12.3 inches',
    '13.4 inches'
  ];

  const GraphicsCards = [
    'Nvidia GeForce RTX 3090',
    'Nvidia GeForce RTX 3080',
    'Nvidia GeForce RTX 3070',
    'Nvidia GeForce RTX 3060',
    'Nvidia GeForce RTX 3050 Ti',
    'Nvidia GeForce RTX 3050',
    'Nvidia GeForce GTX 1660 Ti',
    'Nvidia GeForce GTX 1650 Ti',
    'Nvidia GeForce GTX 1650',
    'Nvidia GeForce MX450',
    'Nvidia GeForce MX350',
    'Nvidia GeForce MX250',
    'Nvidia GeForce MX230',
    'AMD Radeon RX 6900M',
    'AMD Radeon RX 6800M',
    'AMD Radeon RX 6700M',
    'AMD Radeon RX 6600M',
    'AMD Radeon RX 6500M',
    'AMD Radeon RX 6400M',
    'Intel Xe Graphics G7',
    'Intel Iris Xe Graphics G7',
    'Intel Iris Xe Graphics G4',
    'Intel UHD Graphics (Integrated Graphics)'
  ];

  const OperatingSystems = [
    'Windows 10',
    'Windows 11',
    'macOS',
    'Linux (Ubuntu)',
    'Linux (Fedora)',
    'Linux (Debian)',
    'Chrome OS',
    'FreeBSD',
    'OpenBSD',
    'Solaris',
    'Haiku',
    'ReactOS',
    'FreeDOS',
    'Android',
    'iOS',
    'Windows Server',
    'Ubuntu Server',
    'CentOS',
    'Fedora Server',
    'Red Hat Enterprise Linux (RHEL)',
    'SUSE Linux Enterprise Server (SLES)',
    'Oracle Linux',
    'Kali Linux',
    'Arch Linux',
    'Gentoo Linux',
    'Slackware Linux',
    'Mageia',
    'Zorin OS',
    'elementary OS',
    'Pop!_OS',
    'Linux Mint',
    'Deepin',
    'Manjaro',
    'Raspbian',
    'Tizen',
    'Remix OS',
    'Windows 7',
    'Windows 8',
    'Windows Vista',
    'Windows XP',
    'Windows 2000',
    'Windows 98',
    'Windows 95',
    'Windows NT',
    'MS-DOS'
  ];

  const {
    RAM = '',
    brand = '',
    colour = '',
    condition = '',
    displaySize = '',
    graphicCard = '',
    model = '',
    numberOfCores = '',
    operatingSystem = '',
    processor = '',
    storageCapacity = '',
    storageType = '',
    type = ''
  } = { ...data.Computers };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LaptopAndComputersSchemaType>({
    defaultValues: {
      brand,
      colour,
      condition,
      model,
      type,
      displaySize,
      graphicCard,
      numberOfCores,
      processor,
      RAM,
      storageCapacity,
      storageType,
      operatingSystem
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(LaptopAndComputersSchema)
  });

  const fields = watch();

  const submit = async (v: LaptopAndComputersSchemaType) => {
    dispatch({ type: 'modify', payload: { ...data, Computers: v } });
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
      <SelectInput
        items={types}
        register={register('type')}
        errors={errors?.type?.message}
        fields={fields?.type?.length > 0}
        placeholder='type'
      />
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
        register={register('colour')}
        errors={errors?.colour?.message}
        fields={fields?.colour?.length > 0}
        placeholder='colour'
        type='text'
      />
      <SelectInput
        items={conditions}
        register={register('condition')}
        errors={errors?.condition?.message}
        fields={fields?.condition?.length > 0}
        placeholder='condition'
      />
      <SelectInput
        items={RAMsList}
        register={register('RAM')}
        errors={errors?.RAM?.message}
        fields={fields?.RAM?.length > 0}
        placeholder='RAM'
      />
      <SelectInput
        items={OperatingSystems}
        register={register('operatingSystem')}
        errors={errors?.operatingSystem?.message}
        fields={fields?.operatingSystem?.length > 0}
        placeholder='operating System'
      />
      <SelectInput
        items={Processors}
        register={register('processor')}
        errors={errors?.processor?.message}
        fields={fields?.processor?.length > 0}
        placeholder='processor'
      />
      <SelectInput
        items={cores}
        register={register('numberOfCores')}
        errors={errors?.numberOfCores?.message}
        fields={fields?.numberOfCores?.length > 0}
        placeholder='number of cores'
      />
      <SelectInput
        items={StorageCapacities}
        register={register('storageCapacity')}
        errors={errors?.storageCapacity?.message}
        fields={fields?.storageCapacity?.length > 0}
        placeholder='storage capacity'
      />
      <SelectInput
        items={storageTypes}
        register={register('storageType')}
        errors={errors?.storageType?.message}
        fields={fields?.storageType?.length > 0}
        placeholder='Storage Type'
      />
      <SelectInput
        items={DisplaySizes}
        register={register('displaySize')}
        errors={errors?.displaySize?.message}
        fields={fields?.displaySize?.length > 0}
        placeholder='Display size'
      />
      <SelectInput
        items={GraphicsCards}
        register={register('graphicCard')}
        errors={errors?.graphicCard?.message}
        fields={fields?.graphicCard?.length > 0}
        placeholder='graphics card'
      />
      <button
        type='submit'
        disabled={isSubmitting}
        className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondarytext-white  w-max m-auto disabled:bg-red-600'>
        Next
      </button>
    </form>
  );
};

export default ComputersAndLaptops;
