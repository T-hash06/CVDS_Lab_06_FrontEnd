import type React from 'react';
import type { RouteObject } from 'react-router';

import { Button, TextInput, toast } from '@components';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import cookies from 'js-cookie';

import styles from './styles.module.css';

const ENDPOINT = 'https://hsngg4gx-8081.brs.devtunnels.ms/auth';

/**
 * LoginPage component handles the user login functionality.
 * It includes a form with username and password fields, and buttons for submitting the form or navigating to the registration page.
 *
 * @component
 * @returns {JSX.Element} The rendered login page component.
 *
 * @example
 * <LoginPage />
 *
 * @remarks
 * The component uses the `useNavigate` hook from `react-router-dom` to navigate to different routes.
 * It also uses the `useState` hook to manage the loading state during form submission.
 */
function LoginPage() {
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

		try {
			const response = await fetch(ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.status >= 500) {
				toast.error(
					'Sever error',
					'An unknown server error occurred. Please try again later.',
				);
				return;
			}

			if (response.status >= 400) {
				toast.error('Invalid username or password');
				return;
			}

			const { cookie } = await response.json();
			cookies.set('__scss', cookie);

			toast.success('Welcome back!');
			navigate('/');
		} catch (error) {
			toast.error(
				'Network error',
				'An network error occurred. Please try again later.',
			);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
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
				<Button type='button' isLoading={isLoading} to='/register'>
					Register
				</Button>
				<Button type='submit' isPrimary={true} isLoading={isLoading}>
					Login
				</Button>
			</div>
		</form>
	);
}

export const LoginRoute: RouteObject = {
	path: '/login',
	element: <LoginPage />,
};
