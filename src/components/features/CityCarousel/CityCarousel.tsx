import styles from './CityCarousel.module.scss'

const countries = [
  'США',
  'Канада',
  'Мексика',
  'Индия',
  'Бразилия',
  'Великобритания',
  'Франция',
  'Германия',
  'Италия',
  'Япония',
  'Австралия',
]

export const CityCarousel = () => {
  return (
    <div className={styles.carousel}>
      <div className={styles.track}>
        {countries.map(country => (
          <div key={country} className={styles.country}>
            {country}
          </div>
        ))}
      </div>
    </div>
  )
}
