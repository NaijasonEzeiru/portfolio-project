// import { NextRequest, NextResponse } from 'next/server';

// export const POST = async (req: NextRequest) => {
//   console.log('logout route');
//   const response = NextResponse.redirect(
//     new URL(
//       `/?${new URLSearchParams({ message: 'Logged out successfully' })}`,
//       req.url
//     )
//   );
//   response.cookies.set({
//     name: 'token',
//     value: '',
//     sameSite: 'strict',
//     httpOnly: true,
//     path: '/',
//     maxAge: -1
//   });
//   return response;
// };
