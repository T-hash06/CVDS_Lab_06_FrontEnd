import type { RouteObject } from 'react-router-dom';

function AnalyticsPage() {
	return <h1 className='text-xl'>Analytics</h1>;
}

export const AnalyticsRoute: RouteObject = {
	path: '/analytics',
	element: <AnalyticsPage />,
};
