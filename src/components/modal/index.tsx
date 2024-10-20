import type React from 'react';

import styles from './styles.module.css';

interface ModalProps {
	isOpen: boolean;
	children: [
		ReturnType<typeof ModalHeader>,
		ReturnType<typeof ModalBody>,
		ReturnType<typeof ModalFooter>,
	];
	onClose?: () => void;
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
	const { isOpen, children } = props;

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className={styles.backdrop}>
				<div className={styles.modal}>{children}</div>
			</div>
		</>
	);
}
