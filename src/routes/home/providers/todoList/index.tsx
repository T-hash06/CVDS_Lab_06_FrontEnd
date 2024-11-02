import type { Todo } from '@components';
import type { loader } from '@routes/home/loader';
import type React from 'react';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const context = createContext<ReturnType<typeof useTodoListHook> | null>(null);

function useTodoListHook() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [areTodosLoading, setIsLoading] = useState(true);

	const { todosPromise } = useLoaderData() as ReturnType<typeof loader>;

	useEffect(() => {
		todosPromise.then((todos) => {
			setTodos(todos);
			setIsLoading(false);
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

export function useTodoList() {
	const value = useContext(context);

	if (value === null) {
		throw new Error('useTodoList must be used within a TodoListProvider');
	}
	return value;
}

export function TodoListProvider({ children }: { children: React.ReactNode }) {
	const value = useTodoListHook();
	return <context.Provider value={value}>{children}</context.Provider>;
}
