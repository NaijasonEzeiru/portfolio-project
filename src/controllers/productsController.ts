import { eq } from 'drizzle-orm';
import { unlink } from 'fs';
import { promisify } from 'util';

import cloudinary from '@/utils/cloudinary';
import { products } from '../db/schema/schema';
import { db } from '../db/db';
import { NextResponse } from 'next/server';

const unlinkAsync = promisify(unlink);

export const getAllProducts = async (req: Request) => {
  try {
    const allProducts = await db.query.products.findMany();
    console.log(allProducts);
    return new NextResponse(JSON.stringify(allProducts), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export const addNewProduct = async (req: Request) => {
  const formdata = await req.formData();
  console.log(formdata);
  return;
  const {
    category,
    subCategory,
    state,
    city,
    dynamic,
    userName,
    desc,
    phone,
    price,
    negotiable,
    userId
  } = await req.json();
  try {
    if (
      !category ||
      !subCategory ||
      !state ||
      !city ||
      !dynamic ||
      !userName ||
      !desc ||
      !phone ||
      !price ||
      !negotiable ||
      !userId
    ) {
      return new NextResponse(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400 }
      );
    }
    let images = [];

    for (let i = 0; i < +req.files.length; i++) {
      // console.log({ path: req.files[i].path });
      const result = await cloudinary.uploader.upload(req.files[i].path, {
        upload_preset: 'ecomm'
      });
      await unlinkAsync(req.files[i].path);
      images.push(result.secure_url);
    }

    let [product] = await db
      .insert(products)
      .values({
        phone,
        city,
        category,
        state,
        subCategory,
        negotiable,
        userId,
        price: +price,
        specifications: dynamic,
        description: desc,
        cloudinary_ids: images
      })
      .returning();
    if (products) {
      return new NextResponse(JSON.stringify({ message: product }), {
        status: 201
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500
    });
  }
};

// exports.updateProduct = async (req: Request) => {
// 	try {
// 		await prisma.product.update({
// 			where: {
// 				id: req.body.id
// 			},
// 			data: {}
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: 'Internal server error' });
// 	}
// };

export const deleteProduct = async (req: Request) => {
  const { id } = await req.json();
  try {
    const [product] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    for (let i = 0; i < product.cloudinary_ids.length; i++) {
      await cloudinary.uploader.destroy('user.cloudinary_id{imageName}');
    }
    return new NextResponse(
      JSON.stringify({ message: 'The product has been deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export const getProduct = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  console.log(params.id);
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, params.id));
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: 'Product does not exist' }),
        { status: 400 }
      );
    }
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: 'Error: ' + error?.message }),
      { status: 500 }
    );
  }
};
