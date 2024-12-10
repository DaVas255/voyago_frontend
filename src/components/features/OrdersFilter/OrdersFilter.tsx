import { useState } from 'react'
import styles from './OrdersFilter.module.scss'

export const OrdersFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [location, setLocation] = useState('')
  const [interest, setInterest] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleFilter = () => {
    onFilterChange({ location, interest, startDate, endDate })
  }

  return (
    <div className={styles.filter}>
      <input
        type='text'
        placeholder='Локация'
        value={location}
        onChange={e => setLocation(e.target.value)}
        className={styles.filter__input}
      />
      <input
        type='text'
        placeholder='Интерес'
        value={interest}
        onChange={e => setInterest(e.target.value)}
        className={styles.filter__input}
      />
      <input
        type='date'
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        className={styles.filter__input}
      />
      <input
        type='date'
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
        className={styles.filter__input}
      />
      <button onClick={handleFilter} className={styles.filter__button}>
        Применить фильтры
      </button>
    </div>
  )
}
