import type { RouteObject } from 'react-router';

import { TextInput, TodoItem } from '@components';
import { TodoFilterProvider, useTodoFilter } from '@routes/home/providers';

import { useMemo } from 'react';
import styles from './styles.module.css';

const todoList = [
	{
		id: '1',
		name: 'Learn React',
		description: 'Learn React to build web applications.',
		difficulty: 'medium',
		priority: 3,
		done: false,
	},
	{
		id: '2',
		name: 'Learn TypeScript',
		description: 'Learn TypeScript to build type-safe applications.',
		difficulty: 'medium',
		priority: 3,
		done: false,
	},
	{
		id: '3',
		name: 'Learn GraphQL',
		description: 'Learn GraphQL to build APIs.',
		difficulty: 'high',
		priority: 5,
		done: false,
	},
] as const;

function Title() {
	return <h1 className={styles.pageTitle}>Todo App</h1>;
}

function TodoList() {
	const { filter } = useTodoFilter();

	const filteredTodoList = useMemo(() => {
		return todoList.filter((todo) => {
			const matchName = todo.name
				.toLowerCase()
				.includes(filter.toLowerCase());
			const matchDescription = todo.description
				.toLowerCase()
				.includes(filter.toLowerCase());
			const matchDifficulty = todo.difficulty
				.toLowerCase()
				.includes(filter.toLowerCase());
			const matchPriority = todo.priority.toString().includes(filter);
			return (
				matchName ||
				matchDescription ||
				matchDifficulty ||
				matchPriority
			);
		});
	}, [filter]);

	if (filteredTodoList.length === 0) {
		return <p className='text-center self-center'>No tasks found.</p>;
	}

	return (
		<ul className={styles.todoList}>
			{filteredTodoList.map((todo) => (
				<TodoItem key={todo.id} {...todo} />
			))}
		</ul>
	);
}

function Filter() {
	const { filter, setFilter } = useTodoFilter();

	return (
		<TextInput
			placeholder='Search for...'
			value={filter}
			onValueChange={setFilter}
		/>
	);
}

function HomePage() {
	return (
		<>
			<div className={styles.homeContainer}>
				<Title />
				<TodoFilterProvider>
					<Filter />
					<TodoList />
				</TodoFilterProvider>
			</div>
		</>
	);
}

export const HomeRoute: RouteObject = {
	path: '/',
	element: <HomePage />,
};
