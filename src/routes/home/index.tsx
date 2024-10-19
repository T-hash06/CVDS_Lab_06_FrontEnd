import type { RouteObject } from 'react-router';

import { TodoItem } from '@components/todoItem';

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

function HomePage() {
	return (
		<>
			<div className={styles.homeContainer}>
				<h1>Todo list</h1>
				<ul className={styles.todoList}>
					{todoList.map((todo) => (
						<TodoItem key={todo.id} {...todo} />
					))}
				</ul>
			</div>
		</>
	);
}

export const HomeRoute: RouteObject = {
	path: '/',
	element: <HomePage />,
};
