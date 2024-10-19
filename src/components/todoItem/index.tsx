import type React from 'react';

import { Check, Trash } from '@phosphor-icons/react';

import styles from './styles.module.css';

type TodoDifficulty = 'low' | 'medium' | 'high';
type TodoPriority = 1 | 2 | 3 | 4 | 5;

type Todo = {
	id: string;
	name: string;
	description: string;
	difficulty: TodoDifficulty;
	priority: TodoPriority;
	done: boolean;
};

type TodoItemProps = React.LiHTMLAttributes<HTMLLIElement> & Todo;

export function TodoItem(props: TodoItemProps) {
	const { id, name, description, difficulty, priority, done, ...restProps } =
		props;

	return (
		<li {...restProps} className={`${styles.todoItem}`}>
			<h2 className={styles.name}>{name}</h2>
			<p className={styles.description}>{description}</p>
			<span className={styles.priority}>{priority}</span>
			<span className={styles.difficulty}>{difficulty}</span>
			<button
				className={`${styles.button} ${styles.doneButton}`}
				type='button'
			>
				<Check size={20} />
			</button>
			<button
				className={`${styles.button} ${styles.deleteButton}`}
				type='button'
			>
				<Trash size={20} weight='duotone' />
			</button>
		</li>
	);
}
