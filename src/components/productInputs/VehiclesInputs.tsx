'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VehicleSchema, VehicleSchemaType } from '../../utils/schemas';
import {
	CheckboxInput,
	SelectInput,
	TextOrNumberInput
} from '@/components/productInputs/InputFields';
import { useEffect, useState } from 'react';
import { useFormState } from './FormContext';

const VehiclesInput = () => {
	const { handleNext, step, setFormData, formData } = useFormState();
	const keyFeat = [
		'Air Comitioning',
		'Airbags',
		'Alloy Wheels',
		'AM/FM Radio',
		'Android Auto',
		'Anti-Lock Brakes',
		'Armrests',
		'Blind Spot Monitor',
		'Bullbar',
		'CarPlay',
		'CD Player',
		'Cruise Control',
		'Cup Holders',
		'Electric Mirrors',
		'Electric Windows',
		'Front Fog Lamps',
		'Leather Seats',
		'LED Headlights',
		'Parking Assist',
		'Parking Sensors',
		'Roof Rack',
		'Sidesteps',
		'Spotlights',
		'Sunroof',
		'Traction Control',
		'Winch',
		'Xenon Lights'
	];

	const manufactureYear = Array.from(
		{ length: 2023 - 1980 },
		(_, i) => 1981 + i
	);

	const state = ['Brand New', 'Foreign Used', 'Nigerian Used'];

	const secondState = ['Faulty', 'No Fault'];

	const trans = ['Automatic', 'Manual'];

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<VehicleSchemaType>({
		defaultValues: {
			yearOfManufacture: '',
			condition: '',
			secondCondition: '',
			transmission: '',
			colour: '',
			make: '',
			mileage: undefined,
			model: ''
		},
		mode: 'onChange',
		reValidateMode: 'onSubmit',
		resolver: zodResolver(VehicleSchema)
	});

	const fields = watch();

	const submit = async (data: VehicleSchemaType) => {
		setFormData((prev) => ({ ...prev, dynamic: data }));
		handleNext('last');
	};

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className='flex flex-col gap-7 text-black dark:text-white'>
			<TextOrNumberInput
				register={register('make')}
				errors={errors?.make?.message}
				fields={fields?.make?.length > 0}
				placeholder='make'
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
				items={manufactureYear}
				register={register('yearOfManufacture')}
				errors={errors?.yearOfManufacture?.message}
				fields={fields?.yearOfManufacture?.length > 0}
				placeholder='year of manufacture'
			/>
			<SelectInput
				items={state}
				register={register('condition')}
				errors={errors?.condition?.message}
				fields={fields?.condition?.length > 0}
				placeholder='condition'
			/>
			<SelectInput
				items={secondState}
				register={register('secondCondition')}
				errors={errors?.secondCondition?.message}
				fields={fields?.secondCondition?.length > 0}
				placeholder='second condition'
			/>
			<SelectInput
				items={trans}
				register={register('transmission')}
				errors={errors?.transmission?.message}
				fields={fields?.transmission?.length > 0}
				placeholder='transmission'
			/>
			<div
				className={`${
					fields.condition !== 'Brand New' ? 'block' : 'none'
				}`}>
				<TextOrNumberInput
					register={register('mileage')}
					errors={errors?.mileage?.message}
					fields={fields?.mileage > -1}
					placeholder='mileage'
					type='number'
				/>
			</div>
			<div
				className={`${
					formData.subCategory == 'Motorcycles' ? 'block' : 'none'
				}`}>
				<CheckboxInput
					items={keyFeat}
					register={register('keyFeatures')}
					errors={errors?.keyFeatures?.message}
					placeholder='key features'
					fields={fields?.keyFeatures?.length > 0}
					checked={fields?.keyFeatures}
				/>
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

export default VehiclesInput;
