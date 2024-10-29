import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import styles from './CreateOrderForm.module.scss'
import { IOrder } from '@/app/types/types'
import { createOrder } from '@/service/order.service'
import { Input } from '@/components/ui/Input/Input'
import { useRef } from 'react'

export const CreateOrderForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IOrder>()

  const inputRef = useRef(null)

  const { mutate: mutateOrder, isPending: isOrderPending } = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (data: IOrder) => createOrder(data),
    onSuccess() {
      toast.success('Заказ успешно создан')
    },
    onError(error) {
      toast.error('Ошибка создания')
      console.error(error)
    },
    onSettled() {
      reset()
    },
  })

  const onSubmit: SubmitHandler<IOrder> = data => mutateOrder(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['create-order']}>
      <h1 className={styles['create-order__title']}>Создать заказ</h1>
      <input type='text' placeholder='Название' {...register('title', { required: true })} />
      <input type='text' placeholder='Описание' {...register('description', { required: true })} />
      <input type='text' placeholder='Локация' {...register('location', { required: true })} />
      <input type='date' placeholder='Дата начала' {...register('startDate', { required: true })} />
      <input type='date' placeholder='Дата окончания' {...register('endDate')} />
      <button type='submit' className={styles['create-order__submit']} disabled={isOrderPending}>
        Создать
      </button>
    </form>
  )
}
