import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import styles from './CreateOrderForm.module.scss'
import { IOrder } from '@/app/types/types'
import { createOrder } from '@/service/order.service'
import { Input } from '@/components/ui/Input/Input'

export const CreateOrderForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IOrder>()

  const { mutate: mutateOrder, isPending: isOrderPending } = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (data: IOrder) => createOrder(data),
    onSuccess() {
      toast.success('Заказ успешно создан')
      navigate('/orders')
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
      <Input type='text' placeholder='Название' {...register('title', { required: true })} />
      <Input type='text' placeholder='Описание' {...register('description', { required: true })} />
      <Input type='text' placeholder='Локация' {...register('location', { required: true })} />
      <Input type='date' placeholder='Дата начала' {...register('startDate', { required: true })} />
      <Input
        type='date'
        placeholder='Дата окончания'
        {...register('endDate', { required: true })}
      />
      <button type='submit' className={styles['create-order__submit']} disabled={isOrderPending}>
        Создать
      </button>
    </form>
  )
}
