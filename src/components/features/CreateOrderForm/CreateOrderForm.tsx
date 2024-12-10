import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import styles from './CreateOrderForm.module.scss'
import { IInterest, IOrder } from '@/app/types/types'
import { createOrder, getInterests } from '@/service/order.service'
import { Input } from '@/components/ui/Input/Input'
import { TextArea } from '@/components/ui/textarea/TextArea'
import { Button } from '@/components/ui/button/Button'
import { useEffect, useState } from 'react'

export const CreateOrderForm = () => {
  const [interests, setInterests] = useState<IInterest[]>([])
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<IOrder>()

  useEffect(() => {
    getInterests().then(data => setInterests(data))
  }, [])

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
      <div className={styles['create-order__interests']}>
        {interests.map(interest => (
          <label key={interest.id}>
            <input type='checkbox' {...register('interests')} value={interest.id} />
            {interest.name}
          </label>
        ))}
      </div>
      <div className={styles['create-order__wrapper']}>
        <h1 className={styles['create-order__title']}>Создать заказ</h1>
        <Input type='text' placeholder='Название' {...register('title', { required: true })} />
        <TextArea
          placeholder='Описание'
          rows={5}
          {...register('description', { required: true })}
        />
        <Input type='text' placeholder='Локация' {...register('location', { required: true })} />
        <div className={styles['create-order__dates']}>
          <Input
            type='date'
            placeholder='Дата начала'
            {...register('startDate', { required: true })}
          />
          <Input
            type='date'
            placeholder='Дата окончания'
            {...register('endDate', { required: true })}
          />
        </div>

        <Button
          type='submit'
          className={styles['create-order__submit']}
          name='Создать'
          background
          disabled={isOrderPending}
        />
      </div>
    </form>
  )
}
