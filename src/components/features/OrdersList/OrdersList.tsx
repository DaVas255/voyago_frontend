import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import styles from './OrdersList.module.scss'
import { Loader } from '@/components/ui/Loader/Loader'
import { getOrders } from '@/service/order.service'
import { IOrder } from '@/app/types/types'
import { getAccessToken } from '@/service/auth/auth.helper'
import { Button } from '@/components/ui/button/Button'

export const OrdersList = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (getAccessToken()) {
      setIsLoading(true)
      getOrders()
        .then(orders => {
          setOrders(orders)
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

  if (isLoading) return <Loader />

  return (
    <div className={styles.orders}>
      <Button
        type='button'
        name='Создать новый заказ'
        className={styles.orders__create}
        background
        onClick={() => navigate('/orders/new')}
      />
      <div className={styles.orders__list}>
        {orders.length > 0 ? (
          orders.map(order => (
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
          ))
        ) : (
          <p>Пока что нет доступных заказов</p>
        )}
      </div>
    </div>
  )
}
