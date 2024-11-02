import type React from 'react';

import styles from './style.module.css';

/**
 * Props for the Select component.
 *
 * @interface SelectProps
 * @extends {React.SelectHTMLAttributes<HTMLSelectElement>}
 *
 * @property {ReturnType<typeof SelectItem> | ReturnType<typeof SelectItem>[]} children - The child elements, which should be one or more SelectItem components.
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: ReturnType<typeof SelectItem> | ReturnType<typeof SelectItem>[];
}

/**
 * Props for the SelectItem component.
 *
 * @interface SelectItemProps
 * @extends {React.OptionHTMLAttributes<HTMLOptionElement>}
 *
 * @property {string} key - Unique key for the select item.
 * @property {string} value - Value of the select item.
 */
interface SelectItemProps
	extends React.OptionHTMLAttributes<HTMLOptionElement> {
	key: string;
	value: string;
}

/**
 * A functional component that renders an HTML `<option>` element with additional properties.
 *
 * @param props - The properties passed to the component.
 * @param props.children - The content to be displayed inside the `<option>` element.
 * @param props.className - Additional CSS class names to apply to the `<option>` element.
 * @param props.optionProps - Additional properties to be spread onto the `<option>` element.
 * @returns An HTML `<option>` element with the specified properties and children.
 */
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

/**
 * A custom select component that wraps a standard HTML select element.
 *
 * @param props - The properties for the select component.
 * @param props.children - The child elements to be rendered within the select element.
 * @param props.className - Additional class names to apply to the select element.
 * @param props.selectProps - Other properties to be passed to the select element.
 * @returns A JSX element representing the custom select component.
 */
export function Select(props: Readonly<SelectProps>) {
	const { children, className, ...selectProps } = props;

	return (
		<select {...selectProps} className={`${styles.select} ${className}`}>
			{children}
		</select>
	);
}
