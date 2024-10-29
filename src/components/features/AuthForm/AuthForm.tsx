import { useTransition } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'

import styles from './AuthForm.module.scss'
import { AuthFormProps, IFormData } from '@/app/types/types'
import { userAuth } from '@/service/auth/auth.service'
import { AppDispatch } from '@/app/store/store'
import { toggleAuthStatus } from '@/app/store/slices/authSlice'

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
  const dispatch = useDispatch<AppDispatch>()

  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IFormData) => userAuth('login', data),
    onSuccess() {
      startTransition(() => {
        reset()
        dispatch(toggleAuthStatus())
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
        dispatch(toggleAuthStatus())
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
      <label className={styles.auth__field}>
        <input
          type='email'
          placeholder='Введите email'
          {...register('email', { required: true })}
          className={clsx(styles['auth__input'], errors.email && styles['auth__input_error'])}
        />
        {errors.email && (
          <span className={styles['auth__label-error']}>This field is required</span>
        )}
      </label>

      <label className={styles.auth__field}>
        <input
          type='password'
          placeholder='Введите пароль'
          {...register('password', { required: true })}
          className={clsx(styles['auth__input'], errors.password && styles['auth__input_error'])}
        />
        {errors.password && (
          <span className={styles['auth__label-error']}>This field is required</span>
        )}
      </label>

      {!isLogin && (
        <label className={styles.auth__field}>
          <input
            type='password'
            placeholder='Подтвердите пароль'
            {...register('confirm_password', {
              required: true,
              validate: value => value === watch('password'),
            })}
            className={clsx(
              styles['auth__input'],
              errors.confirm_password && styles['auth__input_error'],
            )}
          />
          {errors.confirm_password && (
            <span className={styles['auth__label-error']}>Пароли не совпадают</span>
          )}
        </label>
      )}

      <button type='submit' className={clsx(styles['auth__submit'])} disabled={isLoadingAuthForm}>
        {isLogin ? 'Войти' : 'Зарегистрироваться'}
      </button>

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
