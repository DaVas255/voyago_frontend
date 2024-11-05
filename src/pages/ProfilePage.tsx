import { MyOrders } from '@/components/features/MyOrders/MyOrders'
import { ProfileForm } from '@/components/features/ProfileForm/ProfileForm'
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout'

export const ProfilePage = () => {
  return (
    <MainLayout>
      <ProfileForm />
      <MyOrders />
    </MainLayout>
  )
}
