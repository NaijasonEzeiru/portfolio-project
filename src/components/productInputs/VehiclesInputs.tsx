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

const VehiclesInput = ({ setter, trigg }: any) => {
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

	const trans = ['AMT', 'Automatic', 'CVT', 'Manual'];

	const {
		register,
		watch,
		trigger,
		formState: { errors }
	} = useForm<VehicleSchemaType>({
		defaultValues: {
			yearOfManufacture: '',
			condition: '',
			secondCondition: '',
			transmission: ''
		},
		mode: 'onTouched',
		reValidateMode: 'onSubmit',
		resolver: zodResolver(VehicleSchema)
	});

	useEffect(() => {
		console.log(trigg);
		if (trigg > 2) {
			trigger();
		}
	}, [trigg]);

	const fields = watch();

	setter(fields);

	console.log(watch());

	return (
		<>
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
				register={register('VIN')}
				errors={errors?.VIN?.message}
				fields={fields?.VIN?.length > 0}
				placeholder='VIN'
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
			<CheckboxInput
				items={keyFeat}
				register={register('keyFeatures')}
				errors={errors?.keyFeatures?.message}
				placeholder='key features'
				fields={fields?.keyFeatures?.length > 0}
				checked={fields?.keyFeatures}
			/>
		</>
	);
};

export default VehiclesInput;
