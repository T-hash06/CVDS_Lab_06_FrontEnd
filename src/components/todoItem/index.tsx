import type React from 'react';

import { toast } from '@components';
import { Check, Trash, X } from '@phosphor-icons/react';
import { useTodoList } from '@routes/home/providers';

import cookies from 'js-cookie';

import styles from './styles.module.css';

const ENDPOINT = 'https://hsngg4gx-8081.brs.devtunnels.ms/tasks';

/**
 * Represents the difficulty level of a todo item.
 *
 * @typedef {'low' | 'medium' | 'high'} TodoDifficulty
 * @property {'low'} low - Indicates a low difficulty level.
 * @property {'medium'} medium - Indicates a medium difficulty level.
 * @property {'high'} high - Indicates a high difficulty level.
 */
export type TodoDifficulty = 'low' | 'medium' | 'high';
/**
 * Represents the priority of a todo item.
 *
 * @typedef {1 | 2 | 3 | 4 | 5} TodoPriority
 *
 * @remarks
 * The priority is represented as a number from 1 to 5, where 1 is the highest priority and 5 is the lowest.
 */
export type TodoPriority = 1 | 2 | 3 | 4 | 5;

/**
 * Represents a Todo item.
 *
 * @property {string} id - The unique identifier for the todo item.
 * @property {number} [index] - The optional index of the todo item.
 * @property {string} name - The name of the todo item.
 * @property {string} description - The description of the todo item.
 * @property {TodoDifficulty} [difficulty] - The optional difficulty level of the todo item.
 * @property {TodoPriority} [priority] - The optional priority level of the todo item.
 * @property {string} [deadline] - The optional deadline for the todo item.
 * @property {string[]} [ownerIds] - The optional array of owner IDs associated with the todo item.
 * @property {boolean} done - Indicates whether the todo item is completed.
 * @property {string} createdAt - The creation timestamp of the todo item.
 * @property {string} updatedAt - The last updated timestamp of the todo item.
 */
export type Todo = {
	id: string;
	index?: number;
	name: string;
	description: string;
	difficulty?: TodoDifficulty;
	priority?: TodoPriority;
	deadline?: string;
	ownerIds?: string[];
	done: boolean;
	createdAt: string;
	updatedAt: string;
};

/**
 * Props for the TodoItem component.
 *
 * This type extends the default properties of an HTML list item (`<li>`) element
 * with the properties of a `Todo` object.
 *
 * @property {React.LiHTMLAttributes<HTMLLIElement>} - Default properties for an HTML list item.
 * @property {Todo} - Properties of a Todo object.
 */
type TodoItemProps = React.LiHTMLAttributes<HTMLLIElement> & Todo;

/**
 * Props for the DifficultyChip component.
 *
 * @interface DifficultyChipProps
 * @extends {React.HTMLAttributes<HTMLSpanElement>}
 *
 * @property {TodoDifficulty} difficulty - The difficulty level of the todo item.
 */
interface DifficultyChipProps extends React.HTMLAttributes<HTMLSpanElement> {
	difficulty: TodoDifficulty;
}

/**
 * Props for the PriorityChip component.
 *
 * @interface PriorityChipProps
 * @extends {React.HTMLAttributes<HTMLSpanElement>}
 *
 * @property {TodoPriority} priority - The priority level of the todo item.
 */
interface PriorityChipProps extends React.HTMLAttributes<HTMLSpanElement> {
	priority: TodoPriority;
}

/**
 * A functional component that renders a difficulty chip with styles based on the difficulty level.
 *
 * @param props - The properties for the DifficultyChip component.
 * @param props.difficulty - The difficulty level which can be 'low', 'medium', or 'high'.
 * @param restProps - Any additional properties to be spread onto the span element.
 *
 * @returns A styled span element representing the difficulty level.
 */
function DifficultyChip(props: Readonly<DifficultyChipProps>) {
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

/**
 * A functional component that renders a priority chip with specific styles based on the priority level.
 *
 * @param props - The properties for the PriorityChip component.
 * @param props.priority - The priority level of the chip, ranging from 1 to 5.
 * @param props.restProps - Additional properties to be spread onto the span element.
 *
 * @returns A styled span element representing the priority chip.
 */
function PriorityChip(props: Readonly<PriorityChipProps>) {
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

	const priorityAttr = `priority${priority}` as const;

	return (
		<span
			{...restProps}
			className={`${styles.priority} ${styles[priorityAttr]}`}
			style={{ ...chipStyles[priority] }}
		>
			P{priority}
		</span>
	);
}

/**
 * Component representing a single todo item.
 *
 * @param props - The properties for the TodoItem component.
 * @param props.id - The unique identifier for the todo item.
 * @param props.index - The index of the todo item in the list.
 * @param props.name - The name of the todo item.
 * @param props.description - The description of the todo item.
 * @param props.difficulty - The difficulty level of the todo item.
 * @param props.priority - The priority level of the todo item.
 * @param props.done - The completion status of the todo item.
 * @param props.createdAt - The creation timestamp of the todo item.
 * @param props.updatedAt - The last updated timestamp of the todo item.
 * @param props.deadline - The deadline for the todo item.
 * @param props.ownerIds - The IDs of the owners of the todo item.
 * @param props.restProps - Any additional properties for the todo item.
 *
 * @returns A JSX element representing the todo item.
 */
export function TodoItem(props: Readonly<TodoItemProps>) {
	const {
		id,
		index,
		name,
		description,
		difficulty,
		priority,
		done,
		createdAt,
		updatedAt,
		deadline,
		ownerIds,
		...restProps
	} = props;

	const { updateTodo, removeTodo, usingOptimistic } = useTodoList();
	const isOptimistic = id.startsWith('optimistic-');
	const style = {
		'--index': index,
	} as React.CSSProperties;

	const onClickDone = () => {
		usingOptimistic(async () => {
			updateTodo(id, { done: !done });

			const sessionCookie = cookies.get('__scss') ?? '';

			const response = await fetch(`${ENDPOINT}/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					authorization: sessionCookie,
				},
				body: JSON.stringify({
					id,
					done: !done,
				}),
			});

			if (!response.ok) {
				toast.error('Failed to update todo');
				throw new Error('Failed to update todo');
			}
		});
	};

	const onClickDelete = () => {
		usingOptimistic(async () => {
			removeTodo(id);

			const sessionCookie = cookies.get('__scss') ?? '';

			const response = await fetch(`${ENDPOINT}/${id}`, {
				method: 'DELETE',
				headers: {
					authorization: sessionCookie,
				},
			});

			if (!response.ok) {
				toast.error('Failed to delete todo');
				throw new Error('Failed to delete todo');
			}
		});
	};

	return (
		<li
			{...restProps}
			className={`${styles.todoItem}`}
			style={style}
			data-loading={isOptimistic}
		>
			<h2 className={styles.name}>{name}</h2>
			<p className={styles.description}>
				{description ?? (
					<span className={styles.noDescription}>No description</span>
				)}
			</p>
			{difficulty ? <DifficultyChip difficulty={difficulty} /> : <div />}
			{priority ? <PriorityChip priority={priority} /> : <div />}
			<button
				className={`${styles.button} ${styles.doneButton}`}
				onClick={onClickDone}
				type='button'
				data-done={done}
			>
				{!done ? <Check size={20} /> : <X size={20} />}
			</button>
			<button
				className={`${styles.button} ${styles.deleteButton}`}
				onClick={onClickDelete}
				type='button'
			>
				<Trash size={20} weight='duotone' />
			</button>
		</li>
	);
}
