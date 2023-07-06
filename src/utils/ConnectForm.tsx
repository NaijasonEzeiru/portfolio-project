'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

const ConnectForm = ({ children }: { children: React.ReactNode }) => {
	const methods = useFormContext();

	return children({ ...methods });
};

export default ConnectForm;
