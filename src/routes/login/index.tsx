import type { RouteObject } from 'react-router';

function LoginPage() {
	return (
		<div>
			<h1>Login</h1>
		</div>
	);
}

export const LoginRoute: RouteObject = {
	path: '/login',
	element: <LoginPage />,
};
