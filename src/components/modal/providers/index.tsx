import type React from 'react';

import { createContext, useContext, useState } from 'react';

const modalContext = createContext<ReturnType<typeof modalState> | null>(null);

function modalState() {
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

export function useModal() {
	const context = useContext(modalContext);

	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}

	return context;
}

export function ModalProvider(props: { children: React.ReactNode }) {
	const modal = modalState();

	return (
		<modalContext.Provider value={modal}>
			{props.children}
		</modalContext.Provider>
	);
}
