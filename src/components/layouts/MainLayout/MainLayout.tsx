import { Header } from '@/components/widgets/Header/Header'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main className={styles.mainLayout__main}>
        <Outlet />
      </main>
    </div>
  )
}
