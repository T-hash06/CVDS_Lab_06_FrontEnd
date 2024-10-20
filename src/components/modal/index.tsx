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

export function ModalHeader(props: ModalHeaderProps) {
	return (
		<div className={styles.modalHeader} {...props}>
			{props.children}
		</div>
	);
}

export function ModalBody(props: ModalBodyProps) {
	return (
		<div className={styles.modalBody} {...props}>
			{props.children}
		</div>
	);
}

export function ModalFooter(props: ModalFooterProps) {
	return (
		<div className={styles.modalFooter} {...props}>
			{props.children}
		</div>
	);
}

export function Modal(props: ModalProps) {
	const { closeModal, isOpen } = useModal();
	const { children } = props;

	const onBackdropClick = (
		event:
			| React.MouseEvent<HTMLDivElement>
			| React.KeyboardEvent<HTMLDivElement>,
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
		event:
			| React.MouseEvent<HTMLDivElement>
			| React.KeyboardEvent<HTMLDivElement>,
	) => {
		event.stopPropagation();
	};

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div
				className={styles.backdrop}
				onClick={onBackdropClick}
				onKeyUp={onBackdropClick}
			>
				<div
					className={styles.modal}
					onClick={onModalClick}
					onKeyDown={onModalClick}
				>
					{children}
				</div>
			</div>
		</>
	);
}
