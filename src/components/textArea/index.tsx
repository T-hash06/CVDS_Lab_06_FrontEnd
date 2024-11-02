import type React from 'react';

import styles from './styles.module.css';

/**
 * Props for the TextArea component.
 *
 * @interface TextAreaProps
 * @extends {React.TextareaHTMLAttributes<HTMLTextAreaElement>}
 *
 * @property {boolean} [isLoading] - Indicates if the text area is in a loading state.
 * @property {string} [value] - The current value of the text area.
 * @property {(value: string) => void} [onValueChange] - Callback function to handle changes in the text area value.
 */
interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	isLoading?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
}

/**
 * TextArea component renders a customizable textarea element.
 *
 * @param props - The properties object.
 * @param props.className - Additional class names for the textarea.
 * @param props.isLoading - Boolean flag to indicate if the textarea is in a loading state.
 * @param props.value - The current value of the textarea.
 * @param props.onValueChange - Callback function to handle changes in the textarea value.
 * @param props.textAreaProps - Additional properties to be spread onto the textarea element.
 *
 * @returns A textarea element with the specified properties and event handlers.
 */
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
