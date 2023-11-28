'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/components/AuthContext';

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider enableSystem={true} attribute='class'>
        {children}
      </ThemeProvider>{' '}
    </AuthProvider>
  );
};

export default Providers;
