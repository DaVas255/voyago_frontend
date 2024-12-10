import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import styles from './OrdersList.module.scss'
import { Loader } from '@/components/ui/Loader/Loader'
import { getOrders } from '@/service/order.service'
import { IOrder } from '@/app/types/types'
import { getAccessToken } from '@/service/auth/auth.helper'
import { Button } from '@/components/ui/button/Button'
import { OrdersSearch } from '../OrdersSearch/OrdersSearch'
import { OrdersFilter } from '../OrdersFilter/OrdersFilter'

export const OrdersList = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    if (getAccessToken()) {
      getOrders()
        .then(data => {
          setOrders(data)
          setFilteredOrders(data)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Ошибка загрузки заказов:', error)
          setIsLoading(false)
        })
    } else {
      navigate('/auth')
    }
  }, [])

  const handleFilterChange = (filters: any) => {
    const { location, interest, startDate, endDate } = filters
    const filtered = orders.filter(order => {
      const matchesLocation = location ? order.location.includes(location) : true
      const matchesInterest = interest ? order.interests.some(i => i.name.includes(interest)) : true
      const matchesStartDate = startDate ? new Date(order.startDate) >= new Date(startDate) : true
      const matchesEndDate = endDate ? new Date(order.endDate) <= new Date(endDate) : true

      return matchesLocation && matchesInterest && matchesStartDate && matchesEndDate
    })
    setFilteredOrders(filtered)
  }

  const handleSearch = (query: string) => {
    const searched = orders.filter(
      order =>
        order.title.includes(query) ||
        order.description.includes(query) ||
        order.location.includes(query),
    )
    setFilteredOrders(searched)
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.orders}>
      <Button
        type='button'
        name='Создать новый заказ'
        className={styles.orders__create}
        onClick={() => navigate('/orders/new')}
      />
      <OrdersSearch onSearch={handleSearch} />
      <OrdersFilter onFilterChange={handleFilterChange} />
      <div className={styles.orders__list}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div key={order.id} className={styles.orders__item}>
              <div key={order.id} className={styles.orders__item}>
                <div className={styles.orders__title}>{order.title}</div>
                <div className={styles.orders__name}>
                  <span className={styles.orders__label}>Описание: </span>
                  {order.description}
                </div>
                <div className={styles.orders__name}>
                  <span className={styles.orders__label}>Локация: </span>
                  {order.location}
                </div>
                <div className={clsx(styles.orders__name, styles.orders__author)}>
                  <span className={styles.orders__label}>Автор: </span>
                  {order.user.name}
                </div>
                <div className={styles.orders__name}>
                  <span className={styles.orders__label}>Дата: </span>
                  {order.startDate.split('T')[0]} - {order.endDate.split('T')[0]}
                </div>
                <div className={styles.orders__name}>
                  <span className={styles.orders__label}>Интересы </span>
                  {order.interests.map(interest => interest.name).join(', ')}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Нет доступных заказов</p>
        )}
      </div>
    </div>
  )
}
