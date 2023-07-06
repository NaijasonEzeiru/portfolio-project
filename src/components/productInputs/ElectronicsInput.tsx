'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { places } from '@/utils/Jsons';
import { cat } from '@/utils/Jsons';
import { NewProductSchema, NewProductSchemaType } from '../../utils/schemas';
import dynamic from 'next/dynamic';
import { InputFields } from '@/components/productInputs/InputFields';

const ElectronicsInput = () => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors, isSubmitting, isValid }
	} = useForm<NewProductSchemaType>({
		defaultValues: {},
		mode: 'onChange',
		resolver: zodResolver(NewProductSchema)
	});

	const fields = watch();

	const {
		fields: imgsFields,
		append: appendImgField,
		remove: removeImgField
	} = useFieldArray({
		name: 'imgs',
		control
	});

	const {
		fields: colorFields,
		append: appendColorField,
		remove: removeColorField
	} = useFieldArray({
		name: 'colors',
		control
	});

	console.log(watch());

	return (
		<>
			<InputFields
				top={cat}
				register={register('brandName')}
				errors={errors.brandName?.message}
				fields={fields.brandName.length > 0}
				placeholder='Select category'
			/>
			<div className='relative w-full'>
				<input
					className={`w-full p-[10px] border-solid border-[1px] dark:bg-primary border-opacity-20 bg-white rounded-md outline-0 text-black  text-base transition-transform invalid:border-red-600 peer ${
						fields.brandName?.length > 0 && 'isValid'
					} ${
						fields.brandName?.length > 0 &&
						errors.brandName?.message &&
						'modified text-red-400'
					}`}
					type='text'
					{...register('brandName')}
				/>
				<span className='absolute left-0 p-[10px] pointer-events-none text-base text-black opacity-20 uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.modified]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4'>
					Product Name
				</span>
			</div>
		</>
	);
};

export default ElectronicsInput;
