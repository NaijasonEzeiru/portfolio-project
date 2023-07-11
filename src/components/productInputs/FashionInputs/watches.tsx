import React from 'react';
import { CheckboxInput, SelectInput, TextOrNumberInput } from '../InputFields';
import { useFormState } from '../FormContext';
import {
	FashionWatchesSchema,
	FashionWatchesSchemaType
} from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const ShoesInput = () => {
	const { handleNext, setFormData } = useFormState();
	const displays = ['Analog', 'Analog and Digital', 'Digital'];
	const styles = ['Business', 'Casuals', 'Sport', 'Other'];
	const movements = ['Mechanical', 'Quartz'];
	const features = [
		'Calendar',
		'Chronograph',
		'Compass',
		'LED Display',
		'Water Resistance',
		'Luminous'
	];
	const gender = ['Male', 'Female', 'Unisex'];

	const watchBandMaterials = [
		'Stainless steel',
		'Leather',
		'Rubber',
		'Nylon',
		'Silicone',
		'Canvas',
		'Metal',
		'Ceramic',
		'Titanium',
		'Resin',
		'Plastic',
		'Fabric',
		'Mesh',
		'Wood',
		'Carbon fiber',
		'other'
	];

	const conditions = ['Brand New', 'Used'];

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<FashionWatchesSchemaType>({
		defaultValues: {
			brand: '',
			gender: '',
			title: '',
			bandColour: '',
			bandMaterial: '',
			condition: '',
			display: '',
			features: [],
			movement: '',
			style: []
		},
		mode: 'onChange',
		reValidateMode: 'onSubmit',
		resolver: zodResolver(FashionWatchesSchema)
	});

	const fields = watch();

	const submit = async (data: FashionWatchesSchemaType) => {
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
			<SelectInput
				items={movements}
				register={register('movement')}
				errors={errors?.movement?.message}
				fields={fields?.movement?.length > 0}
				placeholder='movement'
			/>

			<TextOrNumberInput
				register={register('bandColour')}
				errors={errors?.bandColour?.message}
				fields={fields?.bandColour?.length > 0}
				placeholder='band Colour'
				type='text'
			/>
			<SelectInput
				items={gender}
				register={register('gender')}
				errors={errors?.gender?.message}
				fields={fields?.gender?.length > 0}
				placeholder='gender'
			/>
			<SelectInput
				items={displays}
				register={register('display')}
				errors={errors?.display?.message}
				fields={fields?.display?.length > 0}
				placeholder='display'
			/>
			<SelectInput
				items={conditions}
				register={register('condition')}
				errors={errors?.condition?.message}
				fields={fields?.condition?.length > 0}
				placeholder='condition'
			/>
			<SelectInput
				items={watchBandMaterials}
				register={register('bandMaterial')}
				errors={errors?.bandMaterial?.message}
				fields={fields?.bandMaterial?.length > 0}
				placeholder='band material'
			/>
			<CheckboxInput
				items={styles}
				register={register('style')}
				errors={errors?.style?.message}
				placeholder='style'
				fields={fields?.style?.length > 0}
				checked={fields?.style}
			/>
			<CheckboxInput
				items={features}
				register={register('features')}
				errors={errors?.features?.message}
				placeholder='features'
				fields={fields?.features?.length > 0}
				checked={fields?.features}
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
