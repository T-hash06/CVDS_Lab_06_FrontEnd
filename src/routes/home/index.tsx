import type { RouteObject } from 'react-router';

import styles from './styles.module.css';

function HomePage() {
	return (
		<>
			<div className={styles.homeContainer}>Home</div>
		</>
	);
}

export const HomeRoute: RouteObject = {
	path: '/',
	element: <HomePage />,
};
