import type React from 'react';

import styles from './styles.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	isLoading?: boolean;
}

export function TextInput(props: TextInputProps) {
	const { className, isLoading, ...inputProps } = props;
	return (
		<>
			<input
				{...inputProps}
				className={`${styles.input} ${className}`}
				disabled={isLoading}
				data-loading={isLoading}
			/>
		</>
	);
}
