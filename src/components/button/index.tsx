import type React from 'react';

import styles from './styles.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading: boolean;
	isPrimary?: boolean;
}

export function Button(props: ButtonProps) {
	const { isLoading, isPrimary, className, children, ...buttonProps } = props;

	return (
		<>
			<button
				{...buttonProps}
				className={`${styles.button} ${className}`}
				data-primary={isPrimary}
				disabled={isLoading}
				data-loading={isLoading}
			>
				{children}
			</button>
		</>
	);
}
