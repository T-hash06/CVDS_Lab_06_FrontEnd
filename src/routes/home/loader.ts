import type { Todo } from '@components';
import type { Session } from '@types';

import cookies from 'js-cookie';

const TASKS_ENDPOINT = `${import.meta.env.VITE_API_URL}/tasks`;
const SESSION_ENDPOINT = `${import.meta.env.VITE_API_URL}/auth`;

export const loader = () => {
	const todosPromise = new Promise<Todo[]>((resolve) => {
		const sessionCookie = cookies.get('__scss') ?? '';

		fetch(TASKS_ENDPOINT, {
			headers: {
				authorization: sessionCookie,
			},
		})
			.then((response) => {
				if (!response.ok) {
					window.location.href = '/login';
					return;
				}
				return response.json();
			})
			.then((data) => resolve(data))
			.catch(() => {
				window.location.href = '/login';
			});
	});

	const sessionPromise = new Promise<Session>((resolve) => {
		const sessionCookie = cookies.get('__scss') ?? '';

		fetch(SESSION_ENDPOINT, {
			headers: {
				authorization: sessionCookie,
			},
		})
			.then((response) => {
				if (!response.ok) {
					window.location.href = '/login';
					return;
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);

				return resolve(data);
			})
			.catch(() => {
				window.location.href = '/login';
			});
	});

	return {
		todosPromise,
		sessionPromise,
	};
};
