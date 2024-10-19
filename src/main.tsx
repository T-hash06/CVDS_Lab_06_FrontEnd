import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AnalyticsRoute, HomeRoute, LoginRoute } from '@routes';

import './index.css';

const router = createBrowserRouter([HomeRoute, LoginRoute, AnalyticsRoute]);

createRoot(document.getElementById('root') ?? document.body).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
