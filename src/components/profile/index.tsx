import type React from 'react';

import { User } from '@phosphor-icons/react';
import styles from './styles.module.css';

/**
 * Props for the Profile component.
 *
 * @interface ProfileProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 *
 * @property {string} name - The name of the user.
 * @property {string} username - The username of the user.
 */
interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string;
	username: string;
}

/**
 * Renders a user profile component.
 *
 * @param props - The properties for the Profile component.
 * @param props.name - The name of the user.
 * @param props.username - The username of the user.
 * @param props.divProps - Additional div properties to be spread onto the root div element.
 * @returns A JSX element representing the user profile.
 */
export function Profile(props: Readonly<ProfileProps>) {
	const { name, username, ...divProps } = props;
	return (
		<div className={styles.profileContent} {...divProps}>
			<span className={styles.userIcon}>
				<User weight='duotone' size={28} />
			</span>
			<h2 className={styles.name}>{name}</h2>
			<p className={styles.username}>{username}</p>
		</div>
	);
}
