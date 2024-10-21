import type React from 'react';
import type { RouteObject } from 'react-router';

import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	TextArea,
	TextInput,
	TodoItem,
} from '@components';
import { ModalProvider, useModal } from '@components/modal/providers';
import { Plus } from '@phosphor-icons/react';
import { TodoFilterProvider, useTodoFilter } from '@routes/home/providers';
import { useMemo, useState } from 'react';

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

function CreateTodoModal() {
	const { closeModal } = useModal();
	const [isLoading, setLoading] = useState(false);

	const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoading(true);

		const form = event.currentTarget;
		const formData = new FormData(form);

		const data = Object.fromEntries(formData.entries());

		console.log(data);

		setTimeout(() => {
			setLoading(false);
			closeModal();
		}, 3000);
	};

	return (
		<>
			<form onSubmit={onFormSubmit} data-loading={isLoading}>
				<Modal>
					<ModalHeader>
						<h2 className='text-2xl font-semibold text-blue-500'>
							Create a new todo
						</h2>
					</ModalHeader>

					<ModalBody>
						<TextInput
							placeholder='Name'
							className='col-span-12'
							name='name'
							autoFocus={true}
							required={true}
						/>
						<Select
							className='col-span-6'
							name='difficulty'
							required={true}
						>
							<SelectItem key='high' value='high'>
								High
							</SelectItem>
							<SelectItem key='medium' value='medium'>
								Medium
							</SelectItem>
							<SelectItem key='low' value='low'>
								Low
							</SelectItem>
						</Select>
						<TextInput
							placeholder='Priority'
							className='col-span-6'
							type='number'
							name='priority'
							min={1}
							max={5}
							required={true}
						/>
						<TextArea
							placeholder='Description'
							name='description'
							className='col-span-12'
							required={true}
						/>
					</ModalBody>

					<ModalFooter>
						<Button onClick={closeModal} type='button'>
							Cancel
						</Button>
						<Button isPrimary={true} type='submit'>
							Create
						</Button>
					</ModalFooter>
				</Modal>
			</form>
		</>
	);
}

function CreateTodoButton() {
	const { openModal } = useModal();

	return (
		<Button
			onClick={openModal}
			isIconOnly={true}
			isPrimary={true}
			className={styles.createTodoButton}
		>
			<Plus size={32} />
		</Button>
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
				<ModalProvider>
					<CreateTodoModal />
					<CreateTodoButton />
				</ModalProvider>
			</div>
		</>
	);
}

export const HomeRoute: RouteObject = {
	path: '/',
	element: <HomePage />,
};
