import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import styles from './OrdersList.module.scss'
import { Loader } from '@/components/ui/Loader/Loader'
import { getOrders } from '@/service/order.service'
import { IOrder } from '@/app/types/types'
import { RootState } from '@/app/store/store'

export const OrdersList = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      getOrders().then(orders => {
        setOrders(orders)
        console.log(orders)
        setIsLoading(false)
      })
    } else {
      navigate('/auth')
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.orders}>
      <NavLink to={'/orders/new'} className={styles.orders__create}>
        Create order
      </NavLink>
      <div className={styles.orders__list}>
        {orders.length > 0 ? (
          orders.map(order => <div key={order.id}>{order.title}</div>)
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  )
}
