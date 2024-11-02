import type React from 'react';

import { createContext, useContext, useState } from 'react';

/**
 * Context for the modal, initialized with the return type of `useModalHook` or null.
 * This context is used to provide modal state and actions to the component tree.
 */
const modalContext = createContext<ReturnType<typeof useModalHook> | null>(
	null,
);

/**
 * Custom hook to manage the state of a modal.
 *
 * @returns An object containing:
 * - `isOpen` {boolean}: A boolean indicating whether the modal is open.
 * - `closeModal` {function}: A function to close the modal.
 * - `openModal` {function}: A function to open the modal.
 */
function useModalHook() {
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		setIsOpen(true);
	};

	return {
		isOpen,
		closeModal,
		openModal,
	};
}

/**
 * Custom hook to access the modal context.
 *
 * This hook provides access to the modal context, which should be used within a `ModalProvider`.
 * If the hook is used outside of a `ModalProvider`, it will throw an error.
 *
 * @returns The modal context value.
 * @throws Will throw an error if used outside of a `ModalProvider`.
 */
export function useModal() {
	const context = useContext(modalContext);

	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}

	return context;
}

/**
 * Provides a context for managing modal state.
 *
 * @param props - The properties for the ModalProvider component.
 * @param props.children - The child components that will have access to the modal context.
 * @returns A context provider component that supplies modal state to its children.
 */
export function ModalProvider(props: Readonly<{ children: React.ReactNode }>) {
	const modal = useModalHook();

	return (
		<modalContext.Provider value={modal}>
			{props.children}
		</modalContext.Provider>
	);
}
