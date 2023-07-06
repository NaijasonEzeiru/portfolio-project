import Image from 'next/image';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TbCloudUpload } from 'react-icons/tb';
import { NewProductSchema, NewProductSchemaType } from '../utils/shema';
import styles from '../styles/Form.module.css';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../components/Editor'), { ssr: false });

// let renderCount = 0;

const newProduct = () => {
	const size = ['XS', 'S', 'M', 'L', 'XL'] as const;
	const categories = [
		'Clothes',
		'Glasses',
		'Jewelries',
		'Bags',
		'Shoes',
		'Watches'
	];

	// renderCount++;

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors, isSubmitting }
	} = useForm<NewProductSchemaType>({
		defaultValues: {
			colors: [{ name: '', hex: '' }],
			imgs: [{ value: '' }],
			sizes: [],
			gender: '',
			categories: ''
		},
		mode: 'onBlur',
		resolver: zodResolver(NewProductSchema)
	});

	let urlArray = [];
	watch('imgs')?.map((value, index) => {
		if (value.value[0]) {
			const newURL = URL.createObjectURL(value.value[0]);
			urlArray[index] = newURL;
			return () => URL.revokeObjectURL(newURL);
		}
	});

	const descriptionVal = (e, editor) => {
		let desc = editor.getData();
		setValue('desc', desc);
	};

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

	// console.log(watch());
	console.log(watch('imgs'));

	const submit = async ({
		imgs,
		colors,
		sizes,
		price,
		productName,
		category,
		gender,
		desc
	}) => {
		const formData = new FormData();
		for (let i = 0; i < imgs.length; i++) {
			formData.append('images[]', imgs[i]?.value?.[0]);
		}
		formData.append('desc', desc);
		formData.append('colors', JSON.stringify(colors));
		formData.append('sizes', JSON.stringify(sizes));
		formData.append('price', price);
		formData.append('productName', productName);
		formData.append('category', category);
		formData.append('gender', gender);
		const res = await fetch(
			'http://localhost:4000/products/addNewProduct',
			{
				method: 'POST',
				body: formData
			}
		);
		const data = await res.json();
		console.log(data);
	};

	return (
		<div className='bg-secondary '>
			{/* <h2>{renderCount / 2}</h2> */}
			<h2 className='tac'>Add Product</h2>
			<form onSubmit={handleSubmit(submit)}>
				<div className={styles.addNewProduct}>
					<div className={styles.leftFields}>
						<div>
							<label htmlFor='productName'>
								Product Name
								<input
									type='text'
									placeholder='Product Name'
									{...register('productName')}
								/>
							</label>
							<span className={styles.error}>
								{' '}
								{errors.productName?.message}
							</span>
						</div>
						<div className={styles.rowGrid}>
							<div>
								Category:
								<select {...register('category')}>
									<option value='' disabled>
										Select Category
									</option>
									{categories.map((value, i) => (
										<option key={i} value={value}>
											{value}
										</option>
									))}
								</select>
								<span className={styles.error}>
									{' '}
									{errors.category?.message}
								</span>
							</div>
							<div>
								Gender:
								<select {...register('gender')}>
									<option value='' disabled>
										Select Gender
									</option>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
									<option value='Unisex'>Unisex</option>
								</select>
								<span className={styles.error}>
									{' '}
									{errors.gender?.message}
								</span>
							</div>
						</div>
						<div>
							<label htmlFor='productPrice'>
								Product Price
								<input
									type='number'
									{...register('price')}
									placeholder='Product Price'
								/>
							</label>
							<span className={styles.error}>
								{' '}
								{errors.price?.message}
							</span>
						</div>
						<div>
							Description:
							<Editor handleChange={descriptionVal} />
							<span className={styles.error}>
								{' '}
								{errors.desc?.message}
							</span>
						</div>
					</div>
					<div className={styles.rightFields}>
						<div className={styles.dynamicField}>
							Add Images:
							<div>
								<div className={styles.imgsCon}>
									{imgsFields.map((field, index) => (
										<div
											key={field.id}
											className={styles.imgInputField}>
											<label
												className={styles.imgPreview}>
												{!urlArray?.[index] ? (
													<span
														className={
															styles.imgPlaceholder
														}>
														<TbCloudUpload />
														<p>
															Click here to add an
															image
														</p>
													</span>
												) : (
													<img
														src={urlArray?.[index]}
														alt=''
														className='br'
													/>
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
											<span className={styles.error}>
												{' '}
												{
													errors?.imgs?.[index]?.value
														?.message
												}
											</span>
											{index > 0 && (
												<span
													onClick={() =>
														removeImgField(index)
													}
													className={
														styles.imgFieldCancel
													}>
													X
												</span>
											)}
										</div>
									))}
									<div
										className='add tac'
										onClick={() =>
											appendImgField({ value: '' })
										}>
										+
									</div>
								</div>
							</div>
						</div>
						<div className={styles.sizes}>
							Select Sizes:
							<div className={styles.sizesCheckField}>
								{size.map((item, index) => (
									<span
										className={styles.sizeLabel}
										key={index}>
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
							<span className={styles.error}>
								{' '}
								{errors.sizes?.message}
							</span>
						</div>
						<div className={styles.dynamicField}>
							Available Colors:
							<div className={styles.flexWrap}>
								{colorFields.map((field, index) => (
									<div key={field.id} className='half-width'>
										<div className={styles.colorInput}>
											<span
												className={
													styles.colorInputContainer
												}>
												<input
													type='color'
													{...register(
														`colors.${index}.hex` as const
													)}
												/>
											</span>
											<span
												className={
													styles.colorNameInput
												}>
												<input
													type='text'
													placeholder='Color Name'
													{...register(
														`colors.${index}.name` as const
													)}
												/>
											</span>
											{index > 0 && (
												<span
													onClick={() =>
														removeColorField(index)
													}
													className='danger'>
													X
												</span>
											)}
										</div>
										<span className={styles.error}>
											{
												errors?.colors?.[index]?.hex
													?.message
											}
											{errors?.colors?.[index]?.name
												?.message &&
											errors?.colors?.[index]?.hex
												?.message
												? ' & '
												: ''}
											{
												errors?.colors?.[index]?.name
													?.message
											}
										</span>
									</div>
								))}
								<div
									className='add tac'
									onClick={() =>
										appendColorField({ name: '', hex: '' })
									}>
									+
								</div>
							</div>
						</div>
					</div>
				</div>
				<button type='submit' disabled={isSubmitting}>
					Add Product
				</button>
			</form>
		</div>
	);
};

export default newProduct;
