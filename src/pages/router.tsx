import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from './ErrorPage'
import { HomePage } from './HomePage'
import { ProfilePage } from './ProfilePage'
import { AuthPage } from './AuthPage'
import { OrdersPage } from './OrdersPage'
import { CreateOrderPage } from './CreateOrderPage'
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'orders/new',
        element: <CreateOrderPage />,
      },
    ],
  },
  {
    path: '/',
    element: <HomePage />,
  },
])
