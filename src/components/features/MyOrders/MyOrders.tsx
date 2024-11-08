import { useEffect, useState } from 'react'
import clsx from 'clsx'

import styles from './MyOrders.module.scss'
import { IOrder } from '@/app/types/types'
import { getOrdersByUser, updateOrder } from '@/service/order.service'
import { Button } from '@/components/ui/button/Button'

export const MyOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getOrdersByUser()
      .then(orders => {
        setOrders(orders)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Ошибка загрузки заказов:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return ''

  return (
    <div className={styles.myOrders}>
      <h2 className={styles.myOrders__title}>Мои заказы</h2>
      <div className={styles.myOrders__list}>
        {orders &&
          orders.map(order => (
            <div key={order.id} className={styles.myOrders__order}>
              <div className={styles['myOrders__order-title']}>{order.title}</div>
              <div className={styles['myOrders__order-name']}>
                <span className={styles['myOrders__order-label']}>Описание: </span>
                {order.description}
              </div>
              <div className={styles['myOrders__order-name']}>
                <span className={styles['myOrders__order-label']}>Локация: </span>
                {order.location}
              </div>
              <div className={styles['myOrders__order-name']}>
                <span className={styles['myOrders__order-label']}>Дата: </span>
                {order.startDate.split('T')[0]} - {order.endDate.split('T')[0]}
              </div>
              {order.isCompleted && (
                <div className={styles['myOrders__order-name']}>
                  <span className={styles['myOrders__order-label']}>Статус: </span>
                  Завершен
                </div>
              )}

              {!order.isCompleted && (
                <div className={styles['myOrders__order-buttons']}>
                  <Button
                    className={styles['myOrders__order-button']}
                    name='Завершить'
                    background
                    onClick={() => updateOrder(order.id)}
                  />
                  <Button
                    className={styles['myOrders__order-button']}
                    name='Изменить'
                    onClick={() => alert('Не реализовано')}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
