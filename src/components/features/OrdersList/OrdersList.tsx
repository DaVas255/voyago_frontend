import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      setIsLoading(true) // Начинаем загрузку
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
        name='Create order'
        className={styles.orders__create}
        onClick={() => navigate('/orders/new')}
      />
      <div className={styles.orders__list}>
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className={styles.orders__item}>
              <div>{order.title}</div>
              <div>{order.user.name}</div>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  )
}
