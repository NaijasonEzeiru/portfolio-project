import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import CryptoJS from 'crypto-js';
import { config } from 'dotenv';

import { users } from '../db/schema/schema.js';
import { db } from '../db/db.js';
import { NextResponse } from 'next/server.js';

config();

export const getUser = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, params.id));
    return new NextResponse(JSON.stringify(user), {
      status: 201
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'User not found' }),
      {
        status: 500
      }
    );
  }
};

export const updateUser = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const req = await request.json();
  if (req.password) {
    req.password = CryptoJS.AES.encrypt(
      req.password,
      process.env.PASSWORD_SECRET!
    ).toString();
  }
  const { ...all } = req;
  console.log(all);
  try {
    const [updatedUser] = await db
      .update(users)
      .set({})
      .where(eq(users.id, req.params.id))
      .returning({});
    // const updatedUser = await prisma.user.update({
    // 	where: {
    // 		id: req.params.id
    // 	},
    // 	data: all
    // });
    return new NextResponse(JSON.stringify(updateUser), {
      status: 201
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'Operation failed' }),
      {
        status: 500
      }
    );
  }
};
