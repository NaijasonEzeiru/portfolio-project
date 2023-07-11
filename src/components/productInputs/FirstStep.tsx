'use client';

import Image from 'next/image';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { places } from '@/utils/Jsons';
import { cat } from '@/utils/Jsons';
import {
	NewProductGeneralSchema,
	NewProductGeneralSchemaType
} from '../../utils/schemas';
import { SelectInput } from '@/components/productInputs/InputFields';
import { useFormState } from './FormContext';

const FirstStep = () => {
	const size = ['XS', 'S', 'M', 'L', 'XL'];

	const { handleNext, step, setFormData, formData } = useFormState();

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors, isSubmitting }
	} = useForm<NewProductGeneralSchemaType>({
		defaultValues: {
			imgs: [
				{ value: undefined },
				{ value: undefined },
				{ value: undefined }
			],
			state: -1,
			city: '',
			category: -1,
			subCategory: ''
		},
		mode: 'onChange',
		resolver: zodResolver(NewProductGeneralSchema)
	});

	const fields = watch();

	console.log(errors);

	let place: string[] = [];
	if (places?.[fields.state]?.cities) {
		place = places?.[fields.state]?.cities;
	}

	let cats: string[] = [];
	if (cat?.[fields.category]?.subs) {
		cats = cat?.[fields.category]?.subs;
	}

	let urlArray: string[] = [];
	watch('imgs')?.map((value, index) => {
		if (value?.value?.[0]) {
			const newURL = URL.createObjectURL(value?.value?.[0]);
			urlArray[index] = newURL;
			return () => URL.revokeObjectURL(newURL);
		}
	});

	const {
		fields: imgsFields,
		append: appendImgField,
		remove: removeImgField
	} = useFieldArray({
		name: 'imgs',
		control
	});

	const submit = async (data: NewProductGeneralSchemaType) => {
		setFormData((prev) => ({ ...prev, ...data }));
		handleNext(fields.subCategory);
	};

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className='flex flex-col gap-7 text-black dark:text-white'>
			<SelectInput
				top={cat}
				register={register('category')}
				errors={errors.category?.message}
				fields={fields.category > -1}
				placeholder='select category'
			/>

			{fields.category > -1 && (
				<SelectInput
					items={cats}
					register={register('subCategory')}
					errors={errors.subCategory?.message}
					fields={fields?.subCategory?.length > 0}
					placeholder='select sub-category'
				/>
			)}

			<SelectInput
				top={places}
				register={register('state')}
				errors={errors.state?.message}
				fields={+fields?.state > -1}
				placeholder='select state'
			/>

			{+fields?.state > -1 && (
				<SelectInput
					items={place}
					register={register('city')}
					errors={errors.city?.message}
					fields={fields?.city?.length > 0}
					placeholder='select City'
				/>
			)}

			<div className='text-left leading-3'>
				Add Images:
				<div className='overflow-x-auto overflow-y-hidden'>
					<div className='flex items-center gap-2'>
						<div className='flex w-fit gap-2 items-start'>
							{imgsFields.map((field, index) => (
								<div key={field.id} className='relative mb-2'>
									<label className='mt-2 grid items-center w-[198px] h-[132px] border-dashed rounded-lg border-2 dark:border-[1px]'>
										{!urlArray?.[index] ? (
											<span className=''>
												{/* <TbCloudUpload /> */}
												<p className='m-5 text-center leading-5'>
													Click here to add an image
												</p>
											</span>
										) : (
											<span className='w-[198px] h-[132px]'>
												<Image
													src={urlArray?.[index]}
													alt=''
													className='h-full w-full object-cover rounded-lg'
													width={198}
													height={132}
												/>
											</span>
										)}
										<input
											accept='image/*'
											type='file'
											hidden
											{...register(`imgs.${index}.value`)}
										/>
									</label>
									<span className='text-red-400 dark:text-red-300 text-xs'>
										{' '}
										{errors?.imgs?.[index]?.value?.message}
									</span>
									{index > 2 && (
										<span
											onClick={() =>
												removeImgField(index)
											}
											className='absolute font-bold text-xl left-[180px] top-2 text-red-400'>
											X
										</span>
									)}
								</div>
							))}
						</div>
						<div
							className='text-6xl font-light'
							onClick={() =>
								appendImgField({ value: undefined })
							}>
							+
						</div>
					</div>
				</div>
			</div>
			<button
				type='submit'
				disabled={isSubmitting}
				className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary dark:bg-goldColor text-white dark:text-black w-max m-auto disabled:bg-red-600'>
				Next
			</button>
		</form>
	);
};

export default FirstStep;
