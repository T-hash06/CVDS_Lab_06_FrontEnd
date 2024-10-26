import type React from 'react';

import { Check, Trash } from '@phosphor-icons/react';

import styles from './styles.module.css';

export type TodoDifficulty = 'low' | 'medium' | 'high';
export type TodoPriority = 1 | 2 | 3 | 4 | 5;
export type Todo = {
	id: string;
	name: string;
	description: string;
	difficulty: TodoDifficulty;
	priority: TodoPriority;
	done: boolean;
};

type TodoItemProps = React.LiHTMLAttributes<HTMLLIElement> & Todo;

interface DifficultyChipProps extends React.HTMLAttributes<HTMLSpanElement> {
	difficulty: TodoDifficulty;
}

interface PriorityChipProps extends React.HTMLAttributes<HTMLSpanElement> {
	priority: TodoPriority;
}

function DifficultyChip(props: DifficultyChipProps) {
	const { difficulty, ...restProps } = props;

	const chipStyles = {
		low: {
			color: 'hsl(130, 100%, 19%)',
			backgroundColor: 'hsl(130, 70%, 60%)',
		},
		medium: {
			color: 'hsl(48, 100%, 19%)',
			backgroundColor: 'hsl(48, 100%, 50%)',
		},
		high: {
			color: 'hsl(350, 100%, 19%)',
			backgroundColor: 'hsl(350, 90%, 60%)',
		},
	};

	return (
		<span
			{...restProps}
			className={`${styles.difficulty} ${styles[difficulty]}`}
			style={{ ...chipStyles[difficulty] }}
		>
			{difficulty}
		</span>
	);
}

function PriorityChip(props: PriorityChipProps) {
	const { priority, ...restProps } = props;

	const chipStyles = {
		1: {
			color: 'hsl(130, 100%, 19%)',
			backgroundColor: 'hsl(130, 70%, 60%)',
		},
		2: {
			color: 'hsl(130, 100%, 19%)',
			backgroundColor: 'hsl(130, 70%, 60%)',
		},
		3: {
			color: 'hsl(48, 100%, 19%)',
			backgroundColor: 'hsl(48, 100%, 50%)',
		},
		4: {
			color: 'hsl(48, 100%, 19%)',
			backgroundColor: 'hsl(48, 100%, 50%)',
		},
		5: {
			color: 'hsl(350, 100%, 19%)',
			backgroundColor: 'hsl(350, 90%, 60%)',
		},
	} as const;

	return (
		<span
			{...restProps}
			className={`${styles.priority} ${styles[`priority${priority}`]}`}
			style={{ ...chipStyles[priority] }}
		>
			P{priority}
		</span>
	);
}

export function TodoItem(props: TodoItemProps) {
	const { id, name, description, difficulty, priority, done, ...restProps } =
		props;

	return (
		<li {...restProps} className={`${styles.todoItem}`}>
			<h2 className={styles.name}>{name}</h2>
			<p className={styles.description}>{description}</p>
			<DifficultyChip difficulty={difficulty} />
			<PriorityChip priority={priority} />
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
