import type { RouteObject } from 'react-router-dom';

function AnalyticsPage() {
	return <h1>Analytics</h1>;
}

export const AnalyticsRoute: RouteObject = {
	path: '/analytics',
	element: <AnalyticsPage />,
};
