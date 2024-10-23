import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import { HomePage } from './HomePage';
import { ProfilePage } from './ProfilePage';
import { AuthPage } from './AuthPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/profile',
		element: <ProfilePage />,
	},
	{
		path: '/auth',
		element: <AuthPage />,
	},
]);
