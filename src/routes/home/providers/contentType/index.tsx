import type React from 'react';

import { createContext, useContext, useState } from 'react';

/**
 * Context for managing content type state.
 *
 * This context is created using `createContext` and is intended to hold the return value
 * of the `useContentTypeHook` hook. It is initialized with `null`.
 */
const contentTypeContext = createContext<ReturnType<
	typeof useContentTypeHook
> | null>(null);

/**
 * Custom hook to manage and toggle content type between 'tasks' and 'analytics'.
 *
 * @returns An object containing:
 * - `content` {string}: The current content type, either 'tasks' or 'analytics'.
 * - `setContent` {function}: Function to manually set the content type.
 * - `toggleContent` {function}: Function to toggle the content type between 'tasks' and 'analytics'.
 */
function useContentTypeHook() {
	const [content, setContent] = useState<'tasks' | 'analytics'>('tasks');

	const toggleContent = () => {
		setContent((prevContent) =>
			prevContent === 'tasks' ? 'analytics' : 'tasks',
		);
	};

	return {
		content,
		setContent,
		toggleContent,
	};
}

/**
 * Custom hook to access the content type context.
 *
 * This hook provides access to the `contentTypeContext` and ensures that it is used within a `ContentTypeProvider`.
 * If the hook is used outside of a `ContentTypeProvider`, it will throw an error.
 *
 * @returns The current value of the `contentTypeContext`.
 * @throws Will throw an error if the hook is used outside of a `ContentTypeProvider`.
 */
export function useContentType() {
	const context = useContext(contentTypeContext);

	if (!context) {
		throw new Error(
			'useContentType must be used within a ContentTypeProvider',
		);
	}

	return context;
}

/**
 * Provides the content type context to its children components.
 *
 * @param props - The properties object.
 * @param props.children - The child components that will have access to the content type context.
 * @returns A context provider component that supplies the content type value to its children.
 */
export function ContentTypeProvider(
	props: Readonly<{ children: React.ReactNode }>,
) {
	const value = useContentTypeHook();

	return (
		<contentTypeContext.Provider value={value}>
			{props.children}
		</contentTypeContext.Provider>
	);
}
