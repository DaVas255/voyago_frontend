import { Header } from '@/components/widgets/Header/Header'
import styles from './MainLayout.module.scss'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main className={styles.mainLayout__main}>{children}</main>
    </div>
  )
}
