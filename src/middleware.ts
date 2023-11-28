import { NextRequest, NextResponse } from 'next/server';
import { getErrorResponse } from './utils/errorResponse';
import { verifyJWT } from './utils/verifyToken';

interface AuthenticatedRequest extends NextRequest {
  user: { is_admin: boolean };
}

// let redirectToLogin = false;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log({ token });
  const path = req.nextUrl.pathname;

  if (req.url.includes('/signout')) {
    const response = NextResponse.redirect(
      new URL('/?success=You have logged out successfully', req.url)
    );
    response.cookies.delete('token');
    return response;
  }

  if (!token) {
    if (path.startsWith('/login') || path.startsWith('/register')) {
      return NextResponse.next();
    }
    if (path.startsWith('/api/admin') || path.startsWith('/api/auth/logout')) {
      return getErrorResponse(401, 'You are not logged in');
    }
    if (path.startsWith('/admin') || path.startsWith('/dashboard')) {
      return NextResponse.redirect(
        new URL(
          `/login?${new URLSearchParams({
            message: 'You are not logged in',
            callBackUrl: path
          })}`,
          req.url
        )
      );
    }
  }
  const response = NextResponse.next();

  try {
    if (token) {
      const decodedToken = await verifyJWT<{
        id: string;
        role: string;
      }>(token);
      console.log({ decoded: token });
      if (
        decodedToken &&
        (path.startsWith('/login') || path.startsWith('register'))
      ) {
        const res = NextResponse.redirect(
          new URL(
            `/?${new URLSearchParams({
              message: 'You are already logged in'
            })}`,
            req.url
          )
        );
      }
      if (decodedToken.role === 'user' && path.startsWith('/admin')) {
        // TODO redirect to unauthorised page
        return NextResponse.redirect(
          new URL(
            `/login?${new URLSearchParams({
              message: 'Invalid admin credentials',
              callBackUrl: path
            })}`,
            req.url
          )
        );
      }
      if (decodedToken.role === 'user' && path.startsWith('/api/admin')) {
        return getErrorResponse(403, 'You are not authorised for this action');
      }
    }
  } catch (error) {
    console.log(error);

    // redirectToLogin = true;
    if (req.nextUrl.pathname.startsWith('api')) {
      return getErrorResponse(401, 'Token is invalid or user does not exists');
    }
    const response = NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({ message: 'Invalid credentials' })}`,
        req.url
      )
    );
    response.cookies.set({
      name: 'token',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: -1
    });
    return response;
  }
  const authUser = (req as AuthenticatedRequest).user;

  if (
    req.nextUrl.pathname.startsWith('/login') ||
    (req.nextUrl.pathname.startsWith('/register') && authUser)
  ) {
    return NextResponse.redirect(
      new URL(
        `/?${new URLSearchParams({ message: 'You are already logged in' })}`,
        req.url
      )
    );
  }
  return response;
}

export const config = {
  matcher: [
    '/login',
    '/signout',
    '/register',
    '/dashboard',
    '/dashboard/:path*',
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/auth/logout',
    '/api/admin'
  ]
};
