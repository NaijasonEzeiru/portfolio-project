'use client';
import AuthContext from '@/components/AuthContext';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';
import LoadingPage from './LoadingPage';

const IsAuth = (Component: any) => {
  return function IsAuth(props: any) {
    const { user, authChecking }: any = useContext(AuthContext);
    useEffect(() => {
      if (!authChecking && !user) {
        return redirect('/login');
      }
    }, [authChecking, user]);

    if (!user) {
      return <LoadingPage />;
    }
    return <Component {...props} />;
  };
};

export default IsAuth;
