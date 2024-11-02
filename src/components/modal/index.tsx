import type React from 'react';

import { useModal } from '@components/modal/providers';

import styles from './styles.module.css';

/**
 * Props for the Modal component.
 *
 * @interface ModalProps
 * @property {Array} children - An array containing the ModalHeader, ModalBody, and ModalFooter components.
 */
interface ModalProps {
	children: [
		ReturnType<typeof ModalHeader>,
		ReturnType<typeof ModalBody>,
		ReturnType<typeof ModalFooter>,
	];
}

/**
 * Props for the ModalHeader component.
 *
 * @interface ModalHeaderProps
 */
interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the ModalBody component.
 *
 * @interface ModalBodyProps
 */
interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the ModalFooter component.
 *
 * @interface ModalFooterProps
 */
interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * A functional component that renders the header of a modal.
 *
 * @param props - The properties passed to the ModalHeader component.
 * @returns A JSX element representing the modal header.
 */
export function ModalHeader(props: Readonly<ModalHeaderProps>) {
	return (
		<div className={styles.modalHeader} {...props}>
			{props.children}
		</div>
	);
}

/**
 * ModalBody component renders the body content of a modal dialog.
 * It applies the modalBody CSS class and spreads any additional props onto the div element.
 *
 * @param props - The properties for the ModalBody component.
 * @returns A JSX element representing the body of the modal.
 */
export function ModalBody(props: Readonly<ModalBodyProps>) {
	return (
		<div className={styles.modalBody} {...props}>
			{props.children}
		</div>
	);
}

/**
 * ModalFooter component renders the footer section of a modal.
 * It accepts all properties defined in `ModalFooterProps` and spreads them onto the root div element.
 *
 * @param props - The properties for the ModalFooter component.
 * @returns A JSX element representing the footer of a modal.
 */
export function ModalFooter(props: Readonly<ModalFooterProps>) {
	return (
		<div className={styles.modalFooter} {...props}>
			{props.children}
		</div>
	);
}

/**
 * Modal component that displays its children within a modal dialog.
 * The modal can be closed by clicking on the backdrop or pressing the 'Escape' key.
 *
 * @param props - The properties for the Modal component.
 * @param props.children - The content to be displayed inside the modal.
 *
 * @returns The modal component if it is open, otherwise null.
 */
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
