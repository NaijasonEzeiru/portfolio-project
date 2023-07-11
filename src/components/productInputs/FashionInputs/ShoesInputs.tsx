import React from 'react';
import { SelectInput, TextOrNumberInput } from '../InputFields';
import { useFormState } from '../FormContext';
import { ShoesSchema, ShoesSchemaType } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const ShoesInput = () => {
	const { handleNext, setFormData } = useFormState();
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
	const size = Array.from({ length: 47 - 34 }, (_, i) => 34 + i);

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

	const gender = ['Male', 'Female', 'Unisex'];

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<ShoesSchemaType>({
		defaultValues: {
			brand: '',
			colour: '',
			condition: '',
			type: '',
			gender: '',
			mainMaterial: '',
			size: '',
			soleMaterial: '',
			title: ''
		},
		mode: 'onChange',
		reValidateMode: 'onSubmit',
		resolver: zodResolver(ShoesSchema)
	});

	const fields = watch();

	const submit = async (data: ShoesSchemaType) => {
		setFormData((prev) => ({ ...prev, dynamic: data }));
		handleNext('last');
	};

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className='flex flex-col gap-7 text-black dark:text-white'>
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
				items={size}
				register={register('size')}
				errors={errors?.size?.message}
				fields={fields?.size?.length > 0}
				placeholder='size'
			/>
			<SelectInput
				items={gender}
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
				placeholder='main Stone'
			/>
			<button
				type='submit'
				disabled={isSubmitting}
				className='flex gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary dark:bg-goldColor text-white dark:text-black w-max m-auto disabled:bg-red-600'>
				Next
			</button>
		</form>
	);
};

export default ShoesInput;
