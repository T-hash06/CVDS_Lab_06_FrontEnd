import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { HomeRoute, LoginRoute, RegisterRoute } from '@routes';

import './index.css';

const router = createBrowserRouter([HomeRoute, LoginRoute, RegisterRoute]);

createRoot(document.getElementById('root') ?? document.body).render(
	<StrictMode>
		<Toaster position='top-center' />
		<RouterProvider router={router} />
	</StrictMode>,
);
