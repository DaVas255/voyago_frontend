import { useState } from 'react'
import styles from './OrdersSearch.module.scss'
import { Input } from '@/components/ui/Input/Input'

export const OrdersSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className={styles.search}>
      <Input
        type='text'
        placeholder='Поиск заказов...'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {/* <button onClick={handleSearch} className={styles.search__button}>
        Искать
      </button> */}
    </div>
  )
}
