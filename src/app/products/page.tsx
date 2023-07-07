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
import dynamic from 'next/dynamic';
import { SelectInput } from '@/components/productInputs/InputFields';

// let renderCount = 0;

const VehiclesInput = dynamic(
	() => import('../../components/productInputs/VehiclesInputs')
	// { ssr: false }
);

const like = (data: any) => {
	console.log({ like: data });
};

const NewProduct = () => {
	const size = ['XS', 'S', 'M', 'L', 'XL'];
	const trans = ['AMT', 'Automatic', 'CVT', 'Manual'];
	let trig = 1;

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

	const submit = async (hiw) => {
		trig++;
		console.log(hiw);
	};

	// const submit = async ({
	// 	imgs,
	// 	colors,
	// 	sizes,
	// 	price,
	// 	productName,
	// 	category,
	// 	gender,
	// 	desc
	// }) => {
	// 	const formData = new FormData();
	// 	for (let i = 0; i < imgs.length; i++) {
	// 		formData.append('images[]', imgs[i]?.value?.[0]);
	// 	}
	// 	formData.append('desc', desc);
	// 	formData.append('colors', JSON.stringify(colors));
	// 	formData.append('sizes', JSON.stringify(sizes));
	// 	formData.append('price', price);
	// 	formData.append('productName', productName);
	// 	formData.append('category', category);
	// 	formData.append('gender', gender);
	// 	const res = await fetch(
	// 		'http://localhost:4000/products/addNewProduct',
	// 		{
	// 			method: 'POST',
	// 			body: formData
	// 		}
	// 	);
	// 	const data = await res.json();
	// 	console.log(data);
	// };

	return (
		<div className='bg-white dark:bg-secondary rounded-lg shadow-md  dark:white py-12 my-8 px-3 m-3 text-center flex gap-11 flex-col md:mx-14 md:px-16 lg:mx-32'>
			{/* <h2>{renderCount / 2}</h2> */}
			<h2 className='tac'>Add Product</h2>
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
									<div
										key={field.id}
										className='relative mb-2'>
										<label className='mt-2 grid items-center w-[198px] h-[132px] border-dashed rounded-lg border-2 dark:border-[1px]'>
											{!urlArray?.[index] ? (
												<span className=''>
													{/* <TbCloudUpload /> */}
													<p className='m-5 text-center leading-5'>
														Click here to add an
														image
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
												{...register(
													`imgs.${index}.value`
												)}
											/>
										</label>
										<span className='text-red-400 dark:text-red-300 text-xs'>
											{' '}
											{
												errors?.imgs?.[index]?.value
													?.message
											}
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

				{cat[fields.category]?.name === 'Vehicles' && (
					<VehiclesInput setter={like} trigg={trig} />
				)}

				{/* <div className=''>
							Select Sizes:
							<div className=''>
								{size.map((item, index) => (
									<span className='' key={index}>
										<input
											id={item}
											type='checkbox'
											value={item}
											{...register('sizes')}
										/>
										<label key={index} htmlFor={item}>
											{item}
										</label>
									</span>
								))}
							</div>
							<span className='text-red-400 dark:text-red-300 text-xs'>
								{' '}
								{errors.sizes?.message}
							</span>
						</div> */}
				<button
					type='submit'
					disabled={isSubmitting}
					className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary dark:bg-goldColor text-white dark:text-black w-max m-auto disabled:bg-red-600'>
					Post Ad
				</button>
			</form>
		</div>
	);
};

export default NewProduct;
