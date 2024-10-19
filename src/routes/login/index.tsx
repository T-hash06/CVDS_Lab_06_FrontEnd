import type React from 'react';
import type { RouteObject } from 'react-router';

import { useState } from 'react';

import styles from './styles.module.css';

function LoginPage() {
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
					<input
						type='text'
						name='username'
						placeholder='Username'
						required={true}
						disabled={isLoading}
						className={styles.input}
						data-loading={isLoading}
					/>
					<input
						type='password'
						name='password'
						placeholder='Password'
						required={true}
						className={styles.input}
						disabled={isLoading}
						data-loading={isLoading}
					/>
				</div>
				<div className={styles.buttonsContainer}>
					<button
						type='submit'
						className={styles.button}
						disabled={isLoading}
						data-loading={isLoading}
					>
						Register
					</button>
					<button
						type='submit'
						className={styles.button}
						data-primary={true}
						disabled={isLoading}
						data-loading={isLoading}
					>
						Login
					</button>
				</div>
			</form>
		</>
	);
}

export const LoginRoute: RouteObject = {
	path: '/login',
	element: <LoginPage />,
};
