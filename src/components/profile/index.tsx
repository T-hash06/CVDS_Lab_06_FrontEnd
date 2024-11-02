import type React from 'react';

import { User } from '@phosphor-icons/react';
import styles from './styles.module.css';

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string;
	username: string;
}

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
