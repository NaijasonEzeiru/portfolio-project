import { categories } from '../db/schema/schema.js';
import { db } from '../db/db.js';
import { NextResponse } from 'next/server.js';

export const addNewCategory = async (req: Request) => {
  const { name } = await req.json();
  try {
    const cat = await db
      .insert(categories)
      .values({
        name
      })
      .returning();
    return new NextResponse(JSON.stringify({ message: cat }), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
};
