import type { RouteObject } from 'react-router';

function HomePage() {
	return (
		<>
			<h1>Hello world</h1>
		</>
	);
}

export const HomeRoute: RouteObject = {
	path: '/',
	element: <HomePage />,
};
