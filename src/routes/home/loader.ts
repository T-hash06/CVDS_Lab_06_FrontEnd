import type { Todo } from '@components';

const ENDPOINT = `${import.meta.env.VITE_API_URL}/tasks`;

export const loader = () => {
	const todosPromise = new Promise<Todo[]>((resolve) => {
		fetch(ENDPOINT)
			.then((response) => response.json())
			.then((data) => resolve(data));
	});

	return {
		todosPromise,
	};
};
