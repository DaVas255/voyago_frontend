import { useEffect, useState } from 'react'
import styles from './OrdersFilter.module.scss'
import { getInterests } from '@/service/order.service'
import { IInterest } from '@/app/types/types'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button/Button'

export const OrdersFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [location, setLocation] = useState('')
  const [interest, setInterest] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [interests, setInterests] = useState<IInterest[]>([])

  const handleFilter = () => {
    onFilterChange({ location, interest, startDate, endDate })
  }

  useEffect(() => {
    getInterests()
      .then(data => setInterests(data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div className={styles.filter}>
      <Input
        type='text'
        placeholder='Локация'
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <div className={styles.filter__interest}>
        {interests.map((interest: IInterest) => (
          <div key={interest.id}>
            <input
              type='checkbox'
              value={interest.name}
              onChange={e => setInterest(e.target.value)}
              className={styles.filter__input}
            />
            <label htmlFor={interest.name}>{interest.name}</label>
          </div>
        ))}
      </div>

      <Input type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
      <Input type='date' value={endDate} onChange={e => setEndDate(e.target.value)} />
      <Button onClick={handleFilter} name='Применить фильтры' className={styles.filter__button} />
    </div>
  )
}
