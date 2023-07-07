'use client';

import { AuthProvider } from '@/components/AuthContext';
import Footer from '../components/Footer';
import NavBar from '../components/nav/NavBar';
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//	title: 'Create Next App',
//	description: 'Generated by create next app'
//};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='light' style={{ colorScheme: 'light' }}>
			<AuthProvider>
				<Providers>
					<body className='bg-white dark:bg-primary'>
						<NavBar />
						{children}
						<Footer />
					</body>
				</Providers>
			</AuthProvider>
		</html>
	);
}
