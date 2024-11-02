import type React from 'react';

import { createContext, useContext, useState } from 'react';

/**
 * Context for the home route that provides the todo filter functionality.
 * It uses the `useTodoFilterHook` to manage the state and logic for filtering todos.
 * The context is initialized with `null` as the default value.
 */
const homeContext = createContext<ReturnType<typeof useTodoFilterHook> | null>(
	null,
);

/**
 * Custom hook that manages the state of a todo filter.
 *
 * @returns An object containing:
 * - `filter` {string}: The current filter value.
 * - `setFilter` {Function}: Function to update the filter value.
 */
function useTodoFilterHook() {
	const [filter, setFilter] = useState('');

	return { filter, setFilter };
}

/**
 * Custom hook that provides access to the todo filter context.
 *
 * This hook must be used within a `TodoFilterProvider` component.
 * If used outside of a `TodoFilterProvider`, it will throw an error.
 *
 * @throws {Error} If the hook is used outside of a `TodoFilterProvider`.
 * @returns The todo filter context.
 */
export function useTodoFilter() {
	const context = useContext(homeContext);

	if (!context) {
		throw new Error(
			'useTodoFilter must be used within a TodoFilterProvider',
		);
	}

	return context;
}

/**
 * Provides the TodoFilter context to its children components.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will receive the context.
 * @returns The provider component that wraps its children with the TodoFilter context.
 */
export function TodoFilterProvider({
	children,
}: { children: React.ReactNode }) {
	const value = useTodoFilterHook();

	return (
		<homeContext.Provider value={value}>{children}</homeContext.Provider>
	);
}
