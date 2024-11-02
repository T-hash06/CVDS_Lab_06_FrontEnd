import type React from 'react';

import { useModal } from '@components/modal/providers';

import styles from './styles.module.css';

interface ModalProps {
	children: [
		ReturnType<typeof ModalHeader>,
		ReturnType<typeof ModalBody>,
		ReturnType<typeof ModalFooter>,
	];
}

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalHeader(props: Readonly<ModalHeaderProps>) {
	return (
		<div className={styles.modalHeader} {...props}>
			{props.children}
		</div>
	);
}

export function ModalBody(props: Readonly<ModalBodyProps>) {
	return (
		<div className={styles.modalBody} {...props}>
			{props.children}
		</div>
	);
}

export function ModalFooter(props: Readonly<ModalFooterProps>) {
	return (
		<div className={styles.modalFooter} {...props}>
			{props.children}
		</div>
	);
}

export function Modal(props: Readonly<ModalProps>) {
	const { closeModal, isOpen } = useModal();
	const { children } = props;

	const onBackdropClick = (
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
	) => {
		if (
			event.type === 'keyup' &&
			(event as React.KeyboardEvent).key !== 'Escape'
		) {
			return;
		}

		closeModal();
	};

	const onModalClick = (
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
	) => {
		event.stopPropagation();
	};

	if (!isOpen) {
		return null;
	}

	return (
		<section
			className={styles.backdrop}
			onClick={onBackdropClick}
			onKeyUp={onBackdropClick}
		>
			<section
				className={styles.modal}
				onClick={onModalClick}
				onKeyDown={onModalClick}
			>
				{children}
			</section>
		</section>
	);
}
