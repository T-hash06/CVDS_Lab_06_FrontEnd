import type { Todo } from '@components';
import type { loader } from '@routes/home/loader';
import type React from 'react';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

/**
 * Context for the TodoList hook.
 *
 * This context is used to provide the state and actions from the `useTodoListHook`
 * to the components that need access to the TodoList functionality.
 */
const context = createContext<ReturnType<typeof useTodoListHook> | null>(null);

/**
 * Custom hook to manage a todo list.
 *
 * @returns An object containing the following properties and methods:
 * - `todos` {Todo[]} - The current list of todos.
 * - `areTodosLoading` {boolean} - A boolean indicating if the todos are still loading.
 * - `addTodo` {(todo: Todo) => void} - Function to add a new todo to the list.
 * - `removeTodo` {(id: string) => void} - Function to remove a todo from the list by its id.
 * - `updateTodo` {(id: string, updatedTodo: Partial<Todo>) => void} - Function to update a todo by its id with the provided partial todo object.
 * - `usingOptimistic` {(fn: (todos: Todo[]) => Promise<void>) => Promise<void>} - Function to perform an optimistic update. It takes a function that performs the update and rolls back changes if an error occurs.
 */
function useTodoListHook() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [areTodosLoading, setAreTodosLoading] = useState(true);

	const { todosPromise } = useLoaderData() as ReturnType<typeof loader>;

	useEffect(() => {
		todosPromise.then((todos) => {
			setTodos(todos);
			setAreTodosLoading(false);
		});
	}, [todosPromise]);

	const addTodo = (todo: Todo) => {
		setTodos((prevTodos) => [...prevTodos, todo]);
	};

	const removeTodo = (id: string) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};

	const updateTodo = (id: string, updatedTodo: Partial<Todo>) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, ...updatedTodo } : todo,
			),
		);
	};

	const usingOptimistic = async (fn: (todos: Todo[]) => Promise<void>) => {
		const previousTodos = [...todos];

		try {
			await fn(previousTodos);
		} catch (error) {
			console.log(`Rolling back changes: ${error}`);

			setTodos(previousTodos);
		}
	};

	return {
		todos,
		areTodosLoading,
		addTodo,
		removeTodo,
		updateTodo,
		usingOptimistic,
	};
}

/**
 * Custom hook that provides access to the TodoList context.
 *
 * @returns The value from the TodoList context.
 * @throws Will throw an error if the hook is used outside of a TodoListProvider.
 */
export function useTodoList() {
	const value = useContext(context);

	if (value === null) {
		throw new Error('useTodoList must be used within a TodoListProvider');
	}
	return value;
}

/**
 * Provides the TodoList context to its children components.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will receive the context.
 * @returns The provider component that wraps its children with the TodoList context.
 */
export function TodoListProvider({ children }: { children: React.ReactNode }) {
	const value = useTodoListHook();
	return <context.Provider value={value}>{children}</context.Provider>;
}
