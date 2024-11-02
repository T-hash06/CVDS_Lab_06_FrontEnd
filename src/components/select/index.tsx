import type React from 'react';

import styles from './style.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: ReturnType<typeof SelectItem> | ReturnType<typeof SelectItem>[];
}

interface SelectItemProps
	extends React.OptionHTMLAttributes<HTMLOptionElement> {
	key: string;
	value: string;
}

export function SelectItem(props: Readonly<SelectItemProps>) {
	const { children, className, ...optionProps } = props;

	return (
		<option
			{...optionProps}
			className={`${styles.selectOption} ${className}`}
		>
			{children}
		</option>
	);
}

export function Select(props: Readonly<SelectProps>) {
	const { children, className, ...selectProps } = props;

	return (
		<select {...selectProps} className={`${styles.select} ${className}`}>
			{children}
		</select>
	);
}
