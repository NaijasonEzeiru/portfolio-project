import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
	'images/jpeg',
	'images/jpg',
	'images/png',
	'images/webp'
];

export const LoginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Please input a valid email address' })
		.max(50, { message: 'Must contain at most 50 characters' }),
	password: z
		.string()
		.min(4, { message: 'Must contain at least 4 characters' })
		.max(20, { message: 'Must contain at most 20 characters' })
});

export const RegisterSchema = z
	.object({
		firstName: z
			.string()
			.min(2, { message: 'Must contain at least 2 characters' })
			.max(15, { message: 'Must contain at most 15 characters' })
			.regex(/[a-zA-z]/, { message: 'Must contain alphabets only' }),
		lastName: z
			.string()
			.min(2, { message: 'Must contain at least 2 characters' })
			.max(15, { message: 'Must contain at most 15 characters' })
			.regex(/[a-zA-z]/, { message: 'Must contain alphabets only' }),
		email: z
			.string()
			.email({ message: 'Please input a valid email address' })
			.max(40, { message: 'Must contain at most 40 characters' }),
		phone: z.coerce.number(),
		// .min(11, { message: 'must be a valid phone number' })
		// .max(11, { message: 'must be a valid phone number' }),
		password: z
			.string()
			.min(4, { message: 'Must contain at least 4 characters' })
			.max(20, { message: 'Must contain at most 20 characters' }),
		confirmPassword: z
			.string()
			.min(4, { message: 'Must contain at least 4 characters' })
			.max(20, { message: 'Must contain at most 20 characters' })
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords do not match',
				path: ['confirmPassword']
			});
		}
	});

export const VehicleSchema = z.object({
	condition: z.string().min(3, { message: 'Select the condition' }),
	transmission: z.string().min(3, { message: 'Select the transmission' }),
	model: z.string().min(2, { message: 'Too short' }),
	keyFeatures: z.string().array().optional(),
	// .nonempty({ message: 'This field is required' }),
	colour: z.string().min(3, { message: 'Cannot be less than 3 characters' }),
	// VIN: z.string().min(3, { message: 'input the VIN' }),
	make: z.string().min(2, { message: 'Too short' }),
	yearOfManufacture: z
		.string()
		.min(3, { message: 'Select the year of manufacature' }),
	mileage: z.coerce.number().positive().optional(),
	secondCondition: z.string().min(3, { message: 'This field is required' })
	// registered: z
	// 	.string()
	// 	.array()
	// 	.nonempty({ message: 'This field is required' })
});

export const FashionWatchesSchema = z.object({
	title: z.string().min(3, { message: 'Cannot be less than 3 characters' }),
	brand: z.string().min(2, { message: 'Too short' }),
	gender: z.string().min(3, { message: 'Select the gender' }),
	movement: z.string().min(3, { message: 'Select the movement type' }),
	display: z.string().min(3, { message: 'Select the display type' }),
	bandMaterial: z.string().min(3, { message: 'Select the band material' }),
	condition: z.string().min(3, { message: 'Select the condition' }),
	bandColour: z
		.string()
		.min(3, { message: 'Cannot be less than 3 characters' }),
	features: z.string().array().optional(),
	style: z.string().array().nonempty({ message: 'This field is required' })
});

export const lastStepSchema = z.object({
	price: z.coerce.number().positive(),
	desc: z.string().min(10, { message: 'Too short' }),
	negotiable: z
		.string()
		.min(2, { message: 'Select the condition' })
		.optional(),
	phone: z.coerce.string(),
	userName: z.string().min(3, { message: 'Cannot be less than 3 characters' })
});

export const HeadphonesSchema = z.object({
	condition: z.string().min(3, { message: 'Select the condition' }),
	type: z.string().min(3, { message: 'Select the type' }),
	model: z.string().min(3, { message: 'input the model' }),
	formFactor: z.string().min(3, { message: 'This field is required' }),
	connectivity: z.string().min(3, { message: 'This field is required' }),
	resistance: z.string().optional(),
	colour: z.string().min(3, { message: 'Cannot be less than 3 characters' }),
	brand: z.string().min(3, { message: 'input the brand' })
});

export const JewelriesSchema = z.object({
	colour: z.string().min(3, { message: 'Cannot be less than 3 characters' }),
	title: z.string().min(3, { message: 'Cannot be less than 3 characters' }),
	brand: z.string().min(3, { message: 'Too short' }),
	condition: z.string().min(3, { message: 'Select the condition' }),
	gender: z.string().min(3, { message: 'Select the gender' }),
	mainMaterial: z.string().min(3, { message: 'This field is required' }),
	mainStone: z.string().min(3, { message: 'This field is required' }),
	type: z.string().min(3, { message: 'Select the type' })
});

export const ShoesSchema = z.object({
	colour: z.string().min(3, { message: 'Cannot be less than 3 characters' }),
	title: z.string().min(3, { message: 'Cannot be less than 3 characters' }),
	brand: z.string().min(3, { message: 'Too short' }),
	size: z.string().min(1, { message: 'input the size' }),
	condition: z.string().min(3, { message: 'Select the condition' }),
	gender: z.string().min(3, { message: 'Select the gender' }),
	mainMaterial: z.string().min(3, { message: 'This field is required' }),
	soleMaterial: z
		.string()
		.min(3, { message: 'This field is required' })
		.optional(),
	type: z.string().min(3, { message: 'Select the type' })
});

export const LaptopAndComputersSchema = z.object({
	colour: z.string().min(3, { message: 'Cannot be less than 3 characters' }),
	brand: z.string().min(3, { message: 'input the brand' }),
	condition: z.string().min(3, { message: 'Select the condition' }),
	model: z.string().min(2, { message: 'Too short' }),
	type: z.string().min(3, { message: 'Select the type' }),
	processor: z.string().min(3, { message: 'This field is required' }),
	operatingSystem: z.string().min(3, { message: 'This field is required' }),
	storageCapacity: z.string().min(3, { message: 'This field is required' }),
	displaySize: z.string().min(3, { message: 'This field is required' }),
	graphicCard: z.string().min(3, { message: 'This field is required' }),
	storageType: z.string().min(3, { message: 'This field is required' }),
	RAM: z.string().min(3, { message: 'This field is required' }),
	numberOfCores: z.string().min(3, { message: 'This field is required' })
});

export const NewProductGeneralSchema = z.object({
	category: z.coerce
		.number()
		.min(1, { message: 'Select the category' })
		.max(20),
	subCategory: z.string().min(0, { message: 'Select the sub-category' }),
	state: z.coerce.number().min(0, { message: 'Select the state' }).max(36),
	city: z.string().min(3, { message: 'Select the city' }),
	imgs: z
		.object({
			value: z
				.custom<File>()
				.refine((file) => !!file?.[0], 'Img field cannot be empty')
				.refine(
					(file) => file?.[0]?.size <= MAX_FILE_SIZE,
					'Max image size is 5MB.'
				)
		})
		.array()
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type lastStepSchemaType = z.infer<typeof lastStepSchema>;
export type FashionWatchesSchemaType = z.infer<typeof FashionWatchesSchema>;
export type VehicleSchemaType = z.infer<typeof VehicleSchema>;
export type HeadphonesSchemaType = z.infer<typeof HeadphonesSchema>;
export type JewelriesSchemaType = z.infer<typeof JewelriesSchema>;
export type ShoesSchemaType = z.infer<typeof ShoesSchema>;
export type LaptopAndComputersSchemaType = z.infer<
	typeof LaptopAndComputersSchema
>;
export type NewProductGeneralSchemaType = z.infer<
	typeof NewProductGeneralSchema
>;

// computer  monitors, game consoles
