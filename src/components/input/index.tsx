import type React from 'react';

import styles from './styles.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	isLoading?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
}

export function TextInput(props: TextInputProps) {
	const { className, isLoading, value, onValueChange, ...inputProps } = props;

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onValueChange) {
			onValueChange(event.target.value);
		}
	};
	return (
		<>
			<input
				{...inputProps}
				className={`${styles.input} ${className}`}
				disabled={isLoading}
				data-loading={isLoading}
				value={value}
				onChange={onChange}
			/>
		</>
	);
}
