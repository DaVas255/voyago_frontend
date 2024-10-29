import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from './ErrorPage'
import { HomePage } from './HomePage'
import { ProfilePage } from './ProfilePage'
import { AuthPage } from './AuthPage'
import { OrdersPage } from './OrdersPage'
import { CreateOrderPage } from './CreateOrderPage'

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
  {
    path: '/orders',
    element: <OrdersPage />,
  },
  {
    path: '/orders/new',
    element: <CreateOrderPage />,
  },
])
