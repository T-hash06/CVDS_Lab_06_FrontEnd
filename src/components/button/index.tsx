import type React from 'react';

import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface BaseProps {
	isLoading?: boolean;
	isPrimary?: boolean;
	isIconOnly?: boolean;
}

type AsButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AsLinkProps = BaseProps &
	React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

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
