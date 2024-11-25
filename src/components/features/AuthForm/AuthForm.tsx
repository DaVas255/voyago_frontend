import { useTransition } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import clsx from 'clsx'

import styles from './AuthForm.module.scss'
import { AuthFormProps, IFormData } from '@/app/types/types'
import { userAuth } from '@/service/auth/auth.service'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button/Button'

export function AuthForm({ isLogin, setIsLoginForm }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormData>()
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IFormData) => userAuth('login', data),
    onSuccess() {
      startTransition(() => {
        reset()
        navigate('/profile')
      })
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: IFormData) => userAuth('register', data),
    onSuccess() {
      startTransition(() => {
        reset()
        navigate('/profile')
        toast.success('Добро пожаловать!')
      })
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  const isLoadingAuthForm = isPending || isLoginPending || isRegisterPending

  const onSubmit: SubmitHandler<IFormData> = data =>
    isLogin ? mutateLogin(data) : mutateRegister(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
      <h1 className={styles.auth__title}>Добро пожаловать</h1>
      <Input
        type='email'
        placeholder='Введите email'
        {...register('email', { required: true })}
        error={errors.email}
        errorText='Обязательное поле'
      />

      <Input
        type='password'
        placeholder='Введите пароль'
        {...register('password', { required: true })}
        error={errors.password}
        errorText='Обязательное поле'
      />

      {!isLogin && (
        <Input
          type='password'
          placeholder='Подтвердите пароль'
          {...register('confirm_password', {
            required: true,
            validate: value => value === watch('password'),
          })}
          error={errors.confirm_password}
          errorText='Обязательное поле'
        />
      )}

      <Button
        type='submit'
        name={isLogin ? 'Войти' : 'Зарегистрироваться'}
        background
        disabled={isLoadingAuthForm}
      />

      {isLogin ? (
        <p>
          Нет аккаунта?{' '}
          <button
            type='button'
            className={styles.auth__toggleButton}
            onClick={() => setIsLoginForm(false)}
            disabled={isLoadingAuthForm}
          >
            Зарегистрироваться
          </button>
        </p>
      ) : (
        <p>
          Уже есть аккаунт?{' '}
          <button
            type='button'
            className={styles.auth__toggleButton}
            onClick={() => setIsLoginForm(true)}
            disabled={isLoadingAuthForm}
          >
            Войти
          </button>
        </p>
      )}
    </form>
  )
}
