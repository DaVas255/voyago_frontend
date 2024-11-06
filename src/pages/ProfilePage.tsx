import { MyOrders } from '@/components/features/MyOrders/MyOrders'
import { ProfileForm } from '@/components/features/ProfileForm/ProfileForm'

export const ProfilePage = () => {
  return (
    <>
      <ProfileForm />
      <MyOrders />
    </>
  )
}
