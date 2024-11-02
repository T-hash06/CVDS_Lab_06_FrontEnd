import type { Todo } from '@components';
import type React from 'react';
import type { RouteObject } from 'react-router-dom';

import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Profile,
	Select,
	SelectItem,
	TextArea,
	TextInput,
	TodoItem,
	toast,
} from '@components';
import { ModalProvider, useModal } from '@components/modal/providers';
import {
	DifficultyHistogram,
	PriorityAverage,
	TasksCompletedOverTime,
	TotalTimeSpent,
} from '@routes/home/components';
import { loader } from '@routes/home/loader';
import {
	ContentTypeProvider,
	SessionProvider,
	TodoFilterProvider,
	TodoListProvider,
	useContentType,
	useSession,
	useTodoFilter,
	useTodoList,
} from '@routes/home/providers';
import { useMemo, useState } from 'react';

import cookies from 'js-cookie';

import styles from './styles.module.css';

/**
 * Title component that displays a personalized page title.
 *
 * This component uses the `useContentType` and `useSession` hooks to determine
 * the content type and session information, respectively. It displays a title
 * based on the content type ('Tasks' or 'Analytics') and includes the username
 * from the session. If no session is available, it defaults to 'Guest'.
 *
 * @returns A heading element with the personalized page title.
 */
function Title() {
	const { content } = useContentType();
	const { session } = useSession();
	const { username } = session ?? { username: 'Guest' };

	const title = content === 'tasks' ? 'Tasks' : 'Analytics';

	return (
		<h1 className={styles.pageTitle}>
			{username}'s {title}
		</h1>
	);
}

/**
 * Component that renders a list of todo items with filtering capabilities.
 *
 * This component uses the `useTodoFilter` and `useTodoList` hooks to retrieve
 * the current filter and the list of todos, respectively. It then filters the
 * todos based on the filter criteria and displays the filtered list.
 *
 * If the todos are still loading, it displays a loading message. If no todos
 * match the filter criteria, it displays a message indicating that no tasks
 * were found.
 *
 * @component
 * @returns The rendered component.
 */
function TodoList() {
	const { filter } = useTodoFilter();
	const { todos, areTodosLoading } = useTodoList();

	const filteredTodoList = useMemo(() => {
		return todos.filter((todo) => {
			const matchName = todo.name
				.toLowerCase()
				.includes(filter.toLowerCase());
			const matchDescription = todo.description
				.toLowerCase()
				.includes(filter.toLowerCase());
			const matchDifficulty = todo.difficulty
				?.toLowerCase()
				.includes(filter.toLowerCase());
			const matchPriority = todo.priority?.toString().includes(filter);

			return (
				matchName ||
				matchDescription ||
				matchDifficulty ||
				matchPriority
			);
		});
	}, [filter, todos]);

	if (areTodosLoading) {
		return <p className='text-center self-center'>Loading...</p>;
	}

	if (filteredTodoList.length === 0) {
		return <p className='text-center self-center'>No tasks found.</p>;
	}

	return (
		<ul className={styles.todoList}>
			{filteredTodoList.map((todo, index) => (
				<TodoItem key={todo.id} index={index} {...todo} />
			))}
		</ul>
	);
}

/**
 * Filter component that provides a text input for filtering todo items.
 * It uses the `useTodoFilter` hook to get and set the current filter value.
 *
 * @returns The rendered TextInput component.
 */
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

/**
 * CreateTodoModal component renders a modal form for creating a new todo item.
 *
 * The form includes fields for the todo's name, difficulty, priority, and description.
 * It uses optimistic UI updates to immediately reflect the new todo item in the UI
 * before the server confirms the creation.
 *
 * @component
 *
 * @example
 * return (
 *   <CreateTodoModal />
 * )
 *
 * @returns The rendered modal form component.
 *
 */
function CreateTodoModal() {
	const { closeModal } = useModal();
	const [isLoading, setIsLoading] = useState(false);
	const { addTodo, updateTodo, usingOptimistic } = useTodoList();

	const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setIsLoading(true);

		await usingOptimistic(async () => {
			const form = event.currentTarget;
			const formData = new FormData(form);

			const data = Object.fromEntries(formData.entries());
			const endpoint = 'https://hsngg4gx-8081.brs.devtunnels.ms/tasks';
			const optimisticTodo = {
				id: `optimistic-${Date.now()}`,
				...data,
			} as Todo;

			addTodo(optimisticTodo);
			closeModal();

			const sessionCookie = cookies.get('__scss') ?? '';

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: sessionCookie,
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				form.reset();
				const createdTodo = await response.json();
				updateTodo(optimisticTodo.id, createdTodo);
			} else {
				toast.error('Failed to create todo');
				throw new Error('Failed to create todo');
			}
		});

		setIsLoading(false);
	};

	return (
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
	);
}

/**
 * CreateTodoButton component renders a button that triggers the opening of a modal
 * to create a new task. It uses the `useModal` hook to access the `openModal` function.
 *
 * @component
 * @example
 * return (
 *   <CreateTodoButton />
 * )
 *
 * @returns A button element that opens a modal when clicked.
 */
function CreateTodoButton() {
	const { openModal } = useModal();

	return (
		<Button
			onClick={openModal}
			isPrimary={true}
			className={styles.createTodoButton}
		>
			Create Task
		</Button>
	);
}

/**
 * A button component that toggles between showing tasks and analytics.
 *
 * @component
 * @example
 * return (
 *   <ContentButton />
 * )
 *
 * @returns The rendered button component.
 */
function ContentButton() {
	const { content, toggleContent } = useContentType();

	const onClick = () => {
		toggleContent();
	};

	const isTasks = content === 'tasks';
	const buttonContent = isTasks ? 'Show Analytics' : 'Show Todos';

	return (
		<Button
			isPrimary={true}
			className={styles.contentButton}
			onClick={onClick}
		>
			{buttonContent}
		</Button>
	);
}

/**
 * `CloseSessionButton` is a React functional component that renders a button
 * to log out the current user session. It utilizes the `useSession` hook to
 * access the `logout` function, which is called when the button is clicked.
 *
 * @component
 * @example
 * return (
 *   <CloseSessionButton />
 * )
 */
function CloseSessionButton() {
	const { logout } = useSession();

	return (
		<Button
			onClick={logout}
			className={styles.closeSessionButton}
			isPrimary={true}
		>
			Logout
		</Button>
	);
}

/**
 * TasksContent component renders the main content area for tasks.
 * It includes a filter, a to-do list, and a modal for creating new to-dos.
 *
 * @returns The rendered component.
 */
function TasksContent() {
	return (
		<main className={styles.tasksContent}>
			<Filter />
			<TodoList />
			<CreateTodoModal />
		</main>
	);
}

/**
 * AnalyticsContent component renders various analytics visualizations
 * based on the todo list data.
 *
 * The component relies on the useTodoList hook to retrieve the list of todos.
 */
function AnalyticsContent() {
	const { todos } = useTodoList();

	return (
		<main className={styles.analyticsContent}>
			<DifficultyHistogram todos={todos} />
			<TasksCompletedOverTime todos={todos} />
			<PriorityAverage todos={todos} />
			<TotalTimeSpent todos={todos} />
		</main>
	);
}

/**
 * PageContent component that conditionally renders either the TasksContent or AnalyticsContent component
 * based on the current content type.
 *
 * @returns The rendered component based on the content type.
 */
function PageContent() {
	const { content } = useContentType();
	const isTasks = content === 'tasks';

	return isTasks ? <TasksContent /> : <AnalyticsContent />;
}

/**
 * FooterContent component renders the footer section of the application.
 * It displays user profile information and various action buttons if a session is active.
 *
 * @returns The footer element containing user profile and action buttons, or null if no session is active.
 */
function FooterContent() {
	const { session } = useSession();

	if (!session) {
		return null;
	}

	const { username, name } = session;

	return (
		<footer className={styles.footer}>
			<Profile username={username} name={name} />
			<CloseSessionButton />
			<ContentButton />
			<CreateTodoButton />
		</footer>
	);
}

/**
 * HomePage component that sets up the main structure of the home page.
 * It includes various context providers to manage state and functionality
 * across the application.
 *
 * @returns The rendered home page component.
 */
function HomePage() {
	return (
		<div className={styles.homeContainer}>
			<SessionProvider>
				<TodoListProvider>
					<TodoFilterProvider>
						<ModalProvider>
							<ContentTypeProvider>
								<Title />
								<PageContent />
								<FooterContent />
							</ContentTypeProvider>
						</ModalProvider>
					</TodoFilterProvider>
				</TodoListProvider>
			</SessionProvider>
		</div>
	);
}

export const HomeRoute: RouteObject = {
	path: '/',
	element: <HomePage />,
	loader: loader,
};
