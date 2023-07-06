import ConnectForm from '@/utils/ConnectForm';

export const Deep = () => (
	<ConnectForm>
		{/* <TextOrNumberInput
			register={({ register }) => register('price')}
			errors={({ errors }) => errors?.price?.message}
			fields={({ fields }) => fields?.price?.length > 0}
			placeholder='price'
			type='number'
		/> */}
		{({ register }) => <input {...register('price')} />}
	</ConnectForm>
);
