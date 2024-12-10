import { useState } from 'react'
import styles from './OrdersSearch.module.scss'

export const OrdersSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className={styles.search}>
      <input
        type='text'
        placeholder='Поиск заказов...'
        value={query}
        onChange={e => setQuery(e.target.value)}
        className={styles.search__input}
      />
      <button onClick={handleSearch} className={styles.search__button}>
        Искать
      </button>
    </div>
  )
}
