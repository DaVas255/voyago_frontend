import { useState } from 'react'
import clsx from 'clsx'

import styles from './MyOrders.module.scss'
import { IOrder } from '@/app/types/types'
import { getOrdersByUser, updateOrder } from '@/service/order.service'

export const MyOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([])

  getOrdersByUser().then(orders => setOrders(orders))

  return (
    <div className={styles.myOrders}>
      <h2 className={styles.myOrders__title}>Мои заказы</h2>
      <div className={styles.myOrders__list}>
        {orders &&
          orders.map(order => (
            <div
              key={order.id}
              className={clsx(
                styles['myOrders__order'],
                order.isCompleted && styles['myOrders__order_closed'],
              )}
            >
              <div className={styles['myOrders__order-title']}>{order.title}</div>
              <div className={styles['myOrders__order-description']}>
                Описание: {order.description}
              </div>
              <div className={styles['myOrders__order-location']}>Локация: {order.location}</div>
              <div className={styles['myOrders__order-date']}>
                Дата: {order.startDate.split('T')[0]} - {order.endDate.split('T')[0]}
              </div>
              {order.isCompleted && (
                <div className={styles['myOrders__order-status']}>Статус: Завершен</div>
              )}
              {!order.isCompleted && (
                <button
                  className={styles['myOrders__order-button']}
                  onClick={() => updateOrder(order.id)}
                >
                  Завершить
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
