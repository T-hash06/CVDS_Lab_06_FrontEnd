import type { Todo } from '@components';

import cookies from 'js-cookie';

const ENDPOINT = `${import.meta.env.VITE_API_URL}/tasks`;

export const loader = () => {
	const todosPromise = new Promise<Todo[]>((resolve) => {
		const sessionCookie = cookies.get('__scss') ?? '';

		fetch(ENDPOINT, {
			headers: {
				authorization: sessionCookie,
			},
		})
			.then((response) => response.json())
			.then((data) => resolve(data));
	});

	return {
		todosPromise,
	};
};
