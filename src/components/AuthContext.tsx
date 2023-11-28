'use client';

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiAddress } from '@/utils/variables';
import { LoginSchemaType } from '@/utils/schemas';

interface IUser {
  firstName: string;
  lastName: string;
  id: string;
  displayImg: null;
  email: string;
  phone: string;
  role: string;
}

const AuthContext = createContext(null) as any;

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<null | IUser>(null);
  const [err, setErr] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const router = useRouter();

  const login = async ({ email, password }: LoginSchemaType) => {
    console.log(email);
    setLoading(true);
    const res = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',

      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await res.json();
    console.log({ data });
    setLoading(false);
    if (res.ok) {
      setUser(data.user);
      console.log(data.user);
      router.push('/');
    } else {
      setErr(data.message);
    }
  };

  const signout = async () => {
    const res = await fetch(`/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
    console.log({ auth: user });
  }, []);

  const checkUserLoggedIn = async () => {
    const res = await fetch(`/api/auth/login`, {
      credentials: 'include'
    });
    const data = await res.json();
    console.log('🚀 ~ file: AuthContext.tsx:56 ~ data:', data);
    if (res.ok) {
      setUser(data.user);
      setAuthChecking(false);
    } else {
      setUser(null);
      setAuthChecking(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        err,
        authChecking,
        login,
        signout,
        setUser,
        checkUserLoggedIn
      }}>
      {' '}
      {children}{' '}
    </AuthContext.Provider>
  );
};

export default AuthContext;
