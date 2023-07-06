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
		first_name: z
			.string()
			.min(2, { message: 'Must contain at least 2 characters' })
			.max(15, { message: 'Must contain at most 15 characters' })
			.regex(/[a-zA-z]/, { message: 'Must contain alphabets only' }),
		last_name: z
			.string()
			.min(2, { message: 'Must contain at least 2 characters' })
			.max(15, { message: 'Must contain at most 15 characters' })
			.regex(/[a-zA-z]/, { message: 'Must contain alphabets only' }),
		email: z
			.string()
			.email({ message: 'Please input a valid email address' })
			.max(40, { message: 'Must contain at most 40 characters' }),
		password: z
			.string()
			.min(4, { message: 'Must contain at least 4 characters' })
			.max(20, { message: 'Must contain at most 20 characters' }),
		confirm_password: z
			.string()
			.min(4, { message: 'Must contain at least 4 characters' })
			.max(20, { message: 'Must contain at most 20 characters' })
	})
	.superRefine(({ confirm_password, password }, ctx) => {
		if (confirm_password !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords do not match'
			});
		}
	});

export const NewProductSchema = z.object({
	// desc: z.string(),
	brandName: z
		.string()
		.min(3, { message: 'Must contain at least 3 characters' })
		.max(20, { message: 'Must contain at most 20 characters' }),
	title: z
		.string()
		.min(3, { message: 'Must contain at least 3 characters' })
		.max(20, { message: 'Must contain at most 20 characters' }),
	gender: z.enum(['Male', 'Female', 'Unisex'], {
		errorMap: (issue, _ctx) => {
			switch (issue.code) {
				case 'invalid_type':
					return { message: 'Not a valid gender type' };
				case 'invalid_enum_value':
					return { message: 'Invalid gender value' };
				default:
					return { message: 'Invalid Value' };
			}
		}
	}),
	category: z.coerce.number().min(0).max(20),
	subCategory: z.string().min(3, { message: 'Select the sub-category' }),
	state: z.coerce.number().min(0).max(36),
	city: z.string().min(3, { message: 'Select the city' }),
	type: z.string().min(3, { message: 'Select the type' }),
	condition: z.string().min(3, { message: 'Select the condition' }),
	transmission: z.string().min(3, { message: 'Select the transmission' }),
	model: z.string().min(3, { message: 'Select the model' }),
	keyFeatures: z
		.string()
		.array()
		.nonempty({ message: 'This field is required' }),
	colour: z.string().min(3, { message: 'input the colour' }),
	VIN: z.string().min(3, { message: 'input the VIN' }),
	yearOfManufacture: z
		.string()
		.min(3, { message: 'Select the year of manufacature' }),
	price: z.coerce.number().positive(),
	mileage: z.coerce.number().positive(),
	desc: z.string().min(20, { message: 'Too short' }),
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
		.array(),
	secondCondition: z
		.string()
		.min(3, { message: 'Select the second condition' }),
	registered: z
		.string()
		.array()
		.nonempty({ message: 'This field is required' }),
	sizes: z
		.string()
		.array()
		.nonempty({ message: 'At least one size must be selected' }),
	colors: z.array(
		z.object({
			name: z.string().min(2, {
				message: 'Color name must be at least two characters'
			}),
			hex: z.string().min(6, { message: 'Please select a color' })
		})
	)
});

export const VehicleSchema = z.object({
	condition: z.string().min(3, { message: 'Select the condition' }),
	transmission: z.string().min(3, { message: 'Select the transmission' }),
	model: z.string().min(3, { message: 'Select the model' }),
	keyFeatures: z
		.string()
		.array()
		.nonempty({ message: 'This field is required' }),
	colour: z.string().min(3, { message: 'input the colour' }),
	VIN: z.string().min(3, { message: 'input the VIN' }),
	make: z.string().min(3, { message: 'input the make' }),
	yearOfManufacture: z
		.string()
		.min(3, { message: 'Select the year of manufacature' }),
	// mileage: z.coerce.number().positive(),
	secondCondition: z
		.string()
		.min(3, { message: 'Select the second condition' })
	// registered: z
	// 	.string()
	// 	.array()
	// 	.nonempty({ message: 'This field is required' })
});

export const NewProductGeneralSchema = z.object({
	category: z.coerce.number().min(0).max(20),
	subCategory: z.string().min(3, { message: 'Select the sub-category' }),
	state: z.coerce.number().min(0).max(36),
	city: z.string().min(3, { message: 'Select the city' }),
	price: z.coerce.number().positive(),
	// desc: z.string().min(20, { message: 'Too short' }),
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

export type NewProductSchemaType = z.infer<typeof NewProductSchema>;

export type NewProductGeneralSchemaType = z.infer<
	typeof NewProductGeneralSchema
>;

export type VehicleSchemaType = z.infer<typeof VehicleSchema>;
