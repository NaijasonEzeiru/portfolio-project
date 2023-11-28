import { eq } from 'drizzle-orm';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { users } from '../db/schema/schema.js';
import { db } from '../db/db.js';
import { NextRequest, NextResponse } from 'next/server.js';
import { RegisterSchema, LoginSchema } from '@/utils/schemas.js';

config();

const registerUser = async (req: Request) => {
  // Extract the values from the request
  const { password, firstName, lastName, email, phone } = RegisterSchema.parse(
    await req.json()
  );
  // TODO: Change Check if there is an existing user with the same email address
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (existingUser) {
    // If a user with the same email exists, return a 409 response with an error message
    return new NextResponse(
      JSON.stringify({ message: 'This email address is already taken' }),
      { status: 409 }
    );
  }
  try {
    // Hash the password with cryptoJS and create a new User
    const register = await db
      .insert(users)
      .values({
        passwordHash: CryptoJS.AES.encrypt(
          password,
          process.env.PASSWORD_SECRET!
        ).toString(),
        email: email.toLowerCase(),
        firstName,
        lastName,
        phone: phone.toString()
      })
      .returning();
    const { passwordHash, ...rest } = register[0];
    return new NextResponse(JSON.stringify({ ...rest }), { status: 201 });
  } catch (error) {
    console.log(error);
    // if (error.code === 'P2002') {
    // 	return res.status(401).json({
    // 		emailError: 'A user with this email already exists'
    // 	});
    // }
    // res.status(500).json({ error, message: error.message });
  }
};

const loginUser = async (req: Request) => {
  const { email, password } = LoginSchema.parse(await req.json());
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          emailError: 'This email address is not registered'
        }),
        { status: 401 }
      );
    }
    const { passwordHash, ...rest } = user;
    const unhashedPassword = CryptoJS.AES.decrypt(
      passwordHash,
      process.env.PASSWORD_SECRET!
    ).toString(CryptoJS.enc.Utf8);
    if (password !== unhashedPassword) {
      return new NextResponse(
        JSON.stringify({ passwordError: 'This password is incorrect' }),
        { status: 401 }
      );
    } else {
      const accessToken = jwt.sign(
        {
          id: rest.id,
          role: rest.role
        },
        process.env.JWT_SECRET!,
        { expiresIn: '3d' }
      );
      return new Response(
        JSON.stringify({
          ...rest,
          Message: 'logged in successfully'
        }),
        {
          status: 201,
          headers: {
            'Set-Cookie': `access_token=${accessToken}`
          }
        }
      );
    }
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};

const me = async (req: NextRequest) => {
  // const token = req?.headers?.cookie?.match(
  //   new RegExp('(^| )' + 'access_token' + '=([^;]+)')
  // )?.[2];
  const token = req.cookies.get('access_token') as unknown;
  if (token) {
    const decodedToken: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET!
    );
    const { id } = decodedToken;
    if (!id) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'invalid token' }),
        { status: 200 }
      );
    }
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      // !user && res.status(401).json('Email address is not registered');
      if (!user) {
        console.log('no user');
        return new NextResponse(
          JSON.stringify({ message: 'Email address is not registered' }),
          { status: 401 }
        );
      }
      const { passwordHash, ...rest } = user;
      const accessToken = jwt.sign(
        {
          id: rest.id,
          role: rest.role
        },
        process.env.JWT_SECRET!,
        { expiresIn: '14d' }
      );
      return new Response(
        JSON.stringify({
          ...rest,
          Message: 'logged in successfully'
        }),
        {
          status: 201,
          headers: { 'Set-Cookie': `access_token=${accessToken}` }
        }
      );
    } catch (err) {
      console.error(err);
      return new NextResponse(JSON.stringify(err), { status: 500 });
    }
  }
  return new NextResponse(
    JSON.stringify({
      success: false,
      message: 'Error! persist token was not provided'
    }),
    { status: 200 }
  );
};

const logoutUser = () => {
  const res = new NextResponse(
    JSON.stringify({ message: 'You have successfully logged out' }),
    { status: 200 }
  );
  res.cookies.set({ name: 'access_token', value: '', maxAge: 1 });
  return res;
};

export { registerUser, loginUser, me, logoutUser };
