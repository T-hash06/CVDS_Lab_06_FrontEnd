import type React from 'react';
import type { RouteObject } from 'react-router';

import { Button, TextInput } from '@components';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './styles.module.css';

function LoginPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isLoading) {
			return;
		}

		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());

		console.log(JSON.stringify(data));

		setTimeout(() => {
			setIsLoading(false);
			navigate('/');
		}, 2000);
	};

	return (
		<>
			<form
				className={styles.loginContainer}
				method='POST'
				onSubmit={onSubmit}
			>
				<h1 className={styles.title}>Login</h1>
				<div className={styles.inputsContainer}>
					<TextInput
						type='text'
						name='username'
						placeholder='Username'
						required={true}
						isLoading={isLoading}
					/>
					<TextInput
						type='password'
						name='password'
						placeholder='Password'
						required={true}
						isLoading={isLoading}
					/>
				</div>
				<div className={styles.buttonsContainer}>
					<Button isLoading={isLoading}>Register</Button>
					<Button
						type='submit'
						isPrimary={true}
						isLoading={isLoading}
					>
						Login
					</Button>
				</div>
			</form>
		</>
	);
}

export const LoginRoute: RouteObject = {
	path: '/login',
	element: <LoginPage />,
};
