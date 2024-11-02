import type React from 'react';

import styles from './styles.module.css';

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	isLoading?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
}

export function TextArea(props: Readonly<TextAreaProps>) {
	const { className, isLoading, value, onValueChange, ...textAreaProps } =
		props;

	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (onValueChange) {
			onValueChange(event.target.value);
		}
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && event.ctrlKey) {
			event.currentTarget.form?.dispatchEvent(
				new Event('submit', { bubbles: true }),
			);
		}
	};

	return (
		<textarea
			{...textAreaProps}
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
			className={`${styles.textArea} ${className}`}
			disabled={isLoading}
			data-loading={isLoading}
		/>
	);
}
