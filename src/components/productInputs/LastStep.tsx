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
import { useContext, useState } from 'react';
import AuthContext from '../AuthContext';
import { apiAddress } from '@/utils/variables';
import { useRouter } from 'next/navigation';

const LastStep = () => {
	const [loading, setLoading] = useState(false);
	const { setFormData, formData } = useFormState();
	const { user }: any = useContext(AuthContext);
	const router = useRouter();

	const yesOrNo = ['Yes', 'No'];

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting }
	} = useForm<lastStepSchemaType>({
		defaultValues: {
			desc: '',
			price: undefined,
			userName: `${user.firstName} ${user.lastName}`,
			phone: user.phone,
			negotiable: ''
		},
		mode: 'onChange',
		resolver: zodResolver(lastStepSchema)
	});

	const fields = watch();

	const finalSubmit = async (data: lastStepSchemaType) => {
		setLoading(true);
		setFormData((prev) => ({ ...prev, ...fields }));
		console.log(formData);
		const formInputs = new FormData();
		for (let i = 0; i < formData.imgs.length; i++) {
			formInputs.append('images[]', formData.imgs[i]?.value?.[0]);
		}
		// formData.imgs.values[0];
		formInputs.append('desc', formData.desc);
		formInputs.append('dynamic', JSON.stringify(formData.dynamic));
		formInputs.append('city', formData.city);
		formInputs.append('negotiable', formData.negotiable);
		formInputs.append('phone', formData.phone.toString());
		formInputs.append('price', formData.price.toString());
		formInputs.append('state', places[+formData.state].name);
		formInputs.append('subCategory', formData.subCategory);
		formInputs.append('userName', formData.userName);
		formInputs.append('category', cat[+formData.category].name);
		formInputs.append('userId', user.id);
		const res = await fetch(`${apiAddress}/products/add-new-product`, {
			method: 'POST',
			body: formInputs
		});
		const response = await res.json();
		console.log(response);
		if (response?.message?.id) {
			router.push('/');
			setLoading(false);
		} else {
			alert('Something went wrong');
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(finalSubmit)}
			className='flex flex-col gap-7 text-black dark:text-white'>
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
					className={`w-full p-[10px] border-solid border-[1px] dark:bg-primary border-opacity-20 bg-white rounded-md outline-0  text-base transition-transform invalid:border-red-600 peer isValid`}
					type='text'
					{...register('phone')}
					aria-invalid={!!errors}
					value={user.phone}
					disabled
				/>
				<span className='absolute left-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 dark:peer-[.isValid]:bg-secondary dark:peer-focus-visible:bg-secondary dark:peer-[.isValid]:text-white dark:peer-focus-visible:text-white'>
					{' '}
					Phone Number
				</span>
				<span className='text-red-400 dark:text-red-300 text-xs'>
					{errors.phone?.message}
				</span>
			</div>

			<div className='relative w-full'>
				<input
					className={`w-full p-[10px] border-solid border-[1px] dark:bg-primary border-opacity-20 bg-white rounded-md outline-0  text-base transition-transform invalid:border-red-600 peer isValid`}
					type='text'
					{...register('userName')}
					aria-invalid={!!errors}
					value={`${user.firstName} ${user.lastName}`}
					disabled
				/>
				<span className='absolute left-0 p-[10px] pointer-events-none text-base  uppercase transition-transform peer-focus-visible:text-secondary peer-focus-visible:translate-x-[10px] peer-focus-visible:-translate-y-[7px] peer-focus-visible:text-[0.65rem] peer-focus-visible:py-0 peer-focus-visible:px-[10px] peer-[.category]:border-red-400 peer-focus-visible:bg-white peer-focus-visible:border-x-secondary peer-focus-visible:tracking-tight peer-focus-visible:transition-transform peer-focus-visible:opacity-100 peer-focus-visible:border-solid peer-focus-visible:border-[1px] peer-focus-visible:border-y-0 peer-focus-visible:leading-4 peer-[.isValid]:text-secondary peer-[.isValid]:translate-x-[10px] peer-[.isValid]:-translate-y-[7px] peer-[.isValid]:text-[0.65rem] peer-[.isValid]:py-0 peer-[.isValid]:px-[10px] peer-[.isValid]:bg-white peer-[.isValid]:border-x-secondary peer-[.isValid]:tracking-tight peer-[.isValid]:transition-transform peer-[.isValid]:opacity-100 peer-[.isValid]:border-solid peer-[.isValid]:border-[1px] peer-[.isValid]:border-y-0 peer-[.isValid]:leading-4 dark:peer-[.isValid]:bg-secondary dark:peer-focus-visible:bg-secondary dark:peer-[.isValid]:text-white dark:peer-focus-visible:text-white'>
					{' '}
					Name
				</span>
				<span className='text-red-400 dark:text-red-300 text-xs'>
					{errors.userName?.message}
				</span>
			</div>

			<button
				// type='button'
				onClick={() => finalSubmit}
				disabled={loading}
				className='flex disabled:bg-loadingSecondary dark:disabled:bg-disabledGold gap-2 py-2 px-5 rounded-lg shadow-md bg-secondary dark:bg-goldColor text-white dark:text-black w-max m-auto'>
				<div className={loading ? 'lds' : 'hidden'}>
					<div className='bg-white dark:bg-gray-800'></div>
					<div className='bg-white dark:bg-gray-800'></div>
					<div className='bg-white dark:bg-gray-800'></div>
				</div>
				<p>Post Ad</p>
			</button>
		</form>
	);
};

export default LastStep;
