import { OrdersList } from '@/components/features/OrdersList/OrdersList'
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout'

export const OrdersPage = () => {
  return (
    <MainLayout>
      <OrdersList />
    </MainLayout>
  )
}
