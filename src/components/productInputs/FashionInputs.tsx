'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewProductSchema, NewProductSchemaType } from '../../utils/schemas';
import dynamic from 'next/dynamic';
import {
	CheckboxInput,
	SelectInput,
	TextOrNumberInput
} from '@/components/productInputs/InputFields';

const FashionInput = () => {
	const {
		register,
		watch,
		formState: { errors }
	} = useForm<NewProductSchemaType>({
		defaultValues: {
			yearOfManufacture: '',
			condition: '',
			secondCondition: '',
			transmission: ''
		},
		mode: 'onChange',
		resolver: zodResolver(NewProductSchema)
	});

	const fields = watch();

	return (
		<>
			<TextOrNumberInput
				register={register('brandName')}
				errors={errors?.brandName?.message}
				fields={fields?.brandName?.length > 0}
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

export default FashionInput;
