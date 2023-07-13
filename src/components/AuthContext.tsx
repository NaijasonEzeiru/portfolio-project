'use client';

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiAddress } from '@/utils/variables';
import { LoginSchemaType } from '@/utils/schemas';

const AuthContext = createContext(null) as any;

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null) as any;
	const [loading, setLoading] = useState(false);
	const [authChecking, setAuthChecking] = useState(true);

	const router = useRouter();

	const login = async ({ email, password }: LoginSchemaType) => {
		console.log(email);
		setLoading(true);
		const res = await fetch(`${apiAddress}/auth/login`, {
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
		console.log(data);
		setLoading(false);
		if (res.ok) {
			setUser(data);
			console.log(data);
			router.push('/');
			// } else if (data.emailError) {
			// 	setError('email', {
			// 		type: 'server',
			// 		message: data.emailError
			// 	});
			// } else if (data.passwordError) {
			// 	setError('email', {
			// 		type: 'server',
			// 		message: data.emailError
			// 	});
		} else {
			setError(data.message);
			error ?? console.log(error);
		}
	};

	const signout = async () => {
		const res = await fetch(`${apiAddress}/auth/logout`, {
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
		console.log('effect');
		const res = await fetch(`${apiAddress}/auth/me`, {
			method: 'GET',
			credentials: 'include',
			mode: 'no-cors'
		});
		const data = await res.json();
		console.log('🚀 ~ file: AuthContext.tsx:56 ~ data:', data);
		if (res.status == 201) {
			console.log('wow');
			setUser(data);
			setAuthChecking(false);
		} else {
			console.log('failed');
			setUser(null);
			setAuthChecking(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				error,
				authChecking,
				login,
				signout,
				checkUserLoggedIn
			}}>
			{' '}
			{children}{' '}
		</AuthContext.Provider>
	);
};

export default AuthContext;
