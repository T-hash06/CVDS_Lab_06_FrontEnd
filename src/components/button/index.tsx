import type React from 'react';

import { Link } from 'react-router-dom';
import styles from './styles.module.css';

/**
 * Interface representing the base properties for a button component.
 *
 * @property {boolean} [isLoading] - Indicates if the button is in a loading state.
 * @property {boolean} [isPrimary] - Indicates if the button is styled as a primary button.
 * @property {boolean} [isIconOnly] - Indicates if the button contains only an icon without text.
 */
interface BaseProps {
	isLoading?: boolean;
	isPrimary?: boolean;
	isIconOnly?: boolean;
}

/**
 * Props for a button component that extends the base properties and
 * includes all standard button HTML attributes.
 */
type AsButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Props for a component that renders as a link.
 */
type AsLinkProps = BaseProps &
	React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/**
 * Button component that can render as either a button or a link.
 *
 * @param {AsButtonProps | AsLinkProps} props - The props for the button component.
 * @returns The rendered button component.
 * @example
 * <Button isLoading={true} isPrimary={true} isIconOnly={true} onClick={handleClick}>
 * 	<Icon name='loading' />
 * </Button>
 */
export function Button(props: Readonly<AsButtonProps | AsLinkProps>) {
	const {
		isLoading,
		isPrimary,
		isIconOnly,
		className,
		children,
		...htmlProps
	} = props;

	const baseProps = {
		className: `${styles.button} ${className || ''}`,
		disabled: isLoading,
		'data-primary': isPrimary,
		'data-loading': isLoading,
		'data-icon-only': isIconOnly,
	};

	if ('to' in props) {
		const { to, ...linkProps } = htmlProps as AsLinkProps;
		return (
			<Link {...linkProps} {...baseProps} to={to}>
				{children}
			</Link>
		);
	}

	const buttonProps = { ...htmlProps } as AsButtonProps;

	return (
		<button {...buttonProps} {...baseProps}>
			{children}
		</button>
	);
}
