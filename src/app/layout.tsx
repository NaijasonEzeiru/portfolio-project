'use client';

import { AuthProvider } from '@/components/AuthContext';
import Footer from '../components/Footer';
import NavBar from '../components/nav/NavBar';
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Babaloja',
	description: 'Classified ads',
	icons: {
		icon: '/favicon.png'
	}
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='light' style={{ colorScheme: 'light' }}>
			<head>
				<link rel='icon' href='/favicon.png' />
			</head>
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
