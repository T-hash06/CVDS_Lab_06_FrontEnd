import type React from 'react';
import type { RouteObject } from 'react-router';

import { Button, TextInput } from '@components';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './styles.module.css';

const ENDPOINT = `${import.meta.env.VITE_API_URL}/users`;

function RegisterPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isLoading) {
			return;
		}

		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());

		const response = await fetch(ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.status === 201) {
			navigate('/login');
		}

		setIsLoading(false);
	};

	return (
		<>
			<form
				className={styles.registerContainer}
				method='POST'
				onSubmit={onSubmit}
			>
				<h1 className={styles.title}>Register</h1>
				<div className={styles.inputsContainer}>
					<TextInput
						className='col-span-12'
						type='text'
						name='name'
						placeholder='Name'
						required={true}
						isLoading={isLoading}
					/>
					<TextInput
						className='col-span-12'
						type='email'
						name='email'
						placeholder='Email'
						required={true}
						isLoading={isLoading}
					/>
					<TextInput
						className='col-span-6'
						type='text'
						name='username'
						placeholder='Username'
						required={true}
						isLoading={isLoading}
					/>
					<TextInput
						className='col-span-6'
						type='password'
						name='password'
						placeholder='Password'
						required={true}
						isLoading={isLoading}
					/>
				</div>
				<div className={styles.buttonsContainer}>
					<Button isLoading={isLoading} to='/login'>
						Login
					</Button>
					<Button
						type='submit'
						isPrimary={true}
						isLoading={isLoading}
					>
						Register
					</Button>
				</div>
			</form>
		</>
	);
}

export const RegisterRoute: RouteObject = {
	path: '/register',
	element: <RegisterPage />,
};
