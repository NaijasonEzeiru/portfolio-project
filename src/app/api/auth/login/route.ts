import { LoginSchema } from '@/utils/schemas';
import { apiAddress } from '@/utils/variables';
import { verifyJWT, signJwt } from '@/utils/verifyToken';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { email, password } = LoginSchema.parse(await request.json());
  console.log(`${email} and ${password}`);
  try {
    const res = await fetch(`${apiAddress}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const loginResponse = await res.json();
    console.log({ loginResponse });
    if (res.ok) {
      const token = await signJwt({
        id: loginResponse.user.id,
        role: loginResponse.user.role
      });
      const response = NextResponse.json(
        {
          user: loginResponse.user,
          success: 'You are now successfully logged in'
        },
        { status: 200 }
      );
      response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });
      return response;
    } else {
      console.log(loginResponse.statusCode);
      return new NextResponse(
        JSON.stringify({
          message: loginResponse.error
        }),
        { status: loginResponse.statusCode }
      );
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message:
          'Ooops! can not connect to the server. \nCould be a problem with your network or our server is down.'
      }),
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const decodedToken: { id: string } = await verifyJWT(token);
  if (!decodedToken?.id) {
    return new NextResponse(JSON.stringify({ message: 'Forbidden' }), {
      status: 403
    });
  }
  if (decodedToken.id) {
    console.log(decodedToken.id);
    const res = await fetch(`${apiAddress}/auth/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: decodedToken.id
      })
    });
    const { user } = await res.json();
    console.log(user);
    if (res.ok) {
      const token = await signJwt({
        id: user.id,
        role: user.role
      });
      //   return new NextResponse(JSON.stringify({ user }), { status: 200 });
      const response = NextResponse.json(
        {
          user
        },
        { status: 200 }
      );
      response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 // 1 month
      });
      return response;
    } else {
      return new NextResponse(JSON.stringify({ message: user.message }), {
        status: 403
      });
    }
  } else {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Not Authorised'
      }),
      { status: 403 }
    );
  }
};
