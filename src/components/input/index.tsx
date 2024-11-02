import type React from 'react';

import styles from './styles.module.css';

/**
 * Props for the TextInput component.
 *
 * @interface TextInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 *
 * @property {boolean} [isLoading] - Optional flag to indicate if the input is in a loading state.
 * @property {string} [value] - Optional value of the input.
 * @property {(value: string) => void} [onValueChange] - Optional callback function to handle value changes.
 */
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	isLoading?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
}

/**
 * Component that renders a text input field.
 *
 * @param {TextInputProps} props - The props for the TextInput component.
 * @returns The rendered TextInput component.
 */
export function TextInput(props: Readonly<TextInputProps>) {
	const { className, isLoading, value, onValueChange, ...inputProps } = props;

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onValueChange) {
			onValueChange(event.target.value);
		}
	};

	return (
		<input
			{...inputProps}
			className={`${styles.input} ${className}`}
			disabled={isLoading}
			data-loading={isLoading}
			value={value}
			onChange={onChange}
		/>
	);
}
