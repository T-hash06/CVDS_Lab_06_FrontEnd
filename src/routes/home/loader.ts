import type { Todo, TodoDifficulty, TodoPriority } from '@components/todoItem';

export const loader = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	const raw = await response.json();
	const todos: Todo[] = [];

	const difficulties: TodoDifficulty[] = ['low', 'medium', 'high'];
	const priorities: TodoPriority[] = [1, 2, 3, 4, 5];

	for (const todo of raw) {
		todos.push({
			id: todo.id,
			description: todo.title,
			done: todo.completed,
			name: todo.title,
			priority: priorities[Math.floor(Math.random() * priorities.length)],
			difficulty:
				difficulties[Math.floor(Math.random() * difficulties.length)],
		});
	}

	return {
		todos,
	};
};

export type Loader = typeof loader;
