import styles from './Welcome.module.scss'
import { Header } from '@/components/widgets/Header/Header'
import { CityCarousel } from '../CityCarousel/CityCarousel'

export const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <Header />
      <div className={styles.welcome__content}>
        <h1 className={styles.welcome__title}>Планируйте ваше новое приключение</h1>
        <CityCarousel />
      </div>
    </div>
  )
}
