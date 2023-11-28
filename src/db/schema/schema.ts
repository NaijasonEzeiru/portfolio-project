import { InferModel, relations } from 'drizzle-orm';
import {
	pgTable,
	text,
	varchar,
	timestamp,
	uuid,
	integer,
	json
	// primaryKey,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	firstName: varchar('first_name', { length: 120 }).notNull(),
	lastName: varchar('last_name', { length: 120 }).notNull(),
	passwordHash: varchar('password_hash', { length: 120 }).notNull(),
	email: varchar('email', { length: 120 }).notNull(),
	role: text('role', { enum: ['admin', 'user', 'moderator'] })
		.default('user')
		.notNull(),
	phone: varchar('phone', { length: 20 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const userRelations = relations(users, ({ one, many }) => ({
	userAddress: one(userAddress, {
		fields: [users.id],
		references: [userAddress.id]
	}),
	products: many(products),
	payments: many(payments)
}));

//   order         Order_details[]

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;

export const userAddress = pgTable('user_address', {
	id: uuid('id').primaryKey().defaultRandom(),
	phone: varchar('phone', { length: 120 }),
	address: varchar('address', { length: 120 }),
	country: varchar('country', { length: 120 }),
	city: varchar('city', { length: 120 }),
	postalCode: varchar('postal_code', { length: 120 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
	// userId: integer('user_id').references(() => users.id, {
	// 	onDelete: 'cascade'
	// })
});

export type UserAddress = InferModel<typeof userAddress>;
export type NewUserAddress = InferModel<typeof userAddress, 'insert'>;

//   user_id     Int    @unique
//   user        User   @relation(fields: [user_id], references: [id])
// }

export const products = pgTable('products', {
	id: uuid('id').primaryKey().defaultRandom(),
	price: integer('price').notNull(),
	description: text('description').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(), // update timestamp
	cloudinary_ids: varchar('cloudinary_ids', { length: 120 })
		.array()
		.notNull()
		.$type<Array<string>>(), // array
	specifications: json('specifications').notNull(),
	userId: uuid('user_id'),
	// .references(() => users.id)
	// .notNull(),
	category: varchar('category', { length: 20 }).references(
		() => categories.name
	),
	phone: varchar('phone', { length: 20 }).notNull(),
	subCategory: varchar('sub_category', { length: 20 }).notNull(),
	state: varchar('state', { length: 20 }).notNull(),
	city: varchar('city', { length: 20 }).notNull(),
	// condition: varchar('condition', { length: 20 }).notNull(),
	negotiable: varchar('negotiable', { length: 10 }).notNull()
});

export const productsRelations = relations(products, ({ one }) => ({
	user: one(users, {
		fields: [products.userId],
		references: [users.id]
	}),
	products: one(categories, {
		fields: [products.category],
		references: [categories.name]
	})
}));

export type Product = InferModel<typeof products>;
export type NewProduct = InferModel<typeof products, 'insert'>;

//   orders         Order_details[]
//   gender         String
//   colors         Json
//   sizes          String[]
// }

export const payments = pgTable('payments', {
	id: uuid('id').primaryKey().defaultRandom(),
	amount: integer('amount').notNull(),
	provider: varchar('provider', { length: 40 }).notNull(),
	status: text('status', {
		enum: ['completed', 'pending', 'unpaid', 'dispute']
	})
		.default('pending')
		.notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	specifications: json('specifications'),
	userId: uuid('user_id').references(() => users.id)
});

export const paymentsRelations = relations(payments, ({ one }) => ({
	user: one(users, {
		fields: [payments.userId],
		references: [users.id]
	})
}));

export type Payments = InferModel<typeof payments>;
export type NewPayments = InferModel<typeof payments, 'insert'>;

//   order     Order_details? @relation(fields: [order_id], references: [id])
//   order_id  Int            @unique
// }

export const categories = pgTable('categories', {
	name: varchar('name', { length: 20 }).primaryKey()
	// productId: varchar('product_id', { length: 30 }).references(
	// 	() => products.id
	// )
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products)
}));

export type Categories = InferModel<typeof categories>;
export type NewCategories = InferModel<typeof categories, 'insert'>;
