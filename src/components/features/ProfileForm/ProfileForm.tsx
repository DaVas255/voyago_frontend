import { useEffect, useState, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ProfileForm.module.scss'
import { getProfile, updateProfile } from '@/service/user.service'
import { IUser } from '@/app/types/types'
import { Loader } from '@/components/ui/Loader/Loader'
import { SubmitHandler, useForm } from 'react-hook-form'
import { logout } from '@/service/auth/auth.service'
import { AppDispatch, RootState } from '@/app/store/store'
import { toggleAuthStatus } from '@/app/store/slices/authSlice'

export const ProfileForm = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<IUser>()
  const { register, handleSubmit, reset } = useForm<IUser>()
  const [isPending, startTransition] = useTransition()
  const dispatch = useDispatch<AppDispatch>()
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)

  useEffect(() => {
    if (isAuth) {
      getProfile().then(data => {
        setProfile(data)
      })
    } else {
      navigate('/auth')
    }
  }, [])

  const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
    onSuccess() {
      startTransition(() => {
        reset()
        dispatch(toggleAuthStatus())
        navigate('/auth')
      })
    },
    onError(error) {
      toast.error('Ошибка')
      console.error(error)
    },
  })

  const { mutate: mutateProfile, isPending: isProfilePending } = useMutation({
    mutationKey: ['profile'],
    mutationFn: (data: IUser) => updateProfile(data),
    onSuccess() {
      toast.success('Профиль обновлен')
    },
    onError(error) {
      toast.error('Ошибка при обновлении профиля')
      console.error(error)
    },
  })

  const onSubmit: SubmitHandler<IUser> = data => mutateProfile(data)

  return profile ? (
    <div className={styles['profile']}>
      <button
        className={styles['profile__logout']}
        onClick={() => mutateLogout()}
        disabled={isProfilePending || isLogoutPending || isPending}
      >
        Выйти
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['profile__form']}>
        <h2 className={styles['profile__title']}>Hello {profile.name}!</h2>

        <label>
          Email
          <input type='text' className={styles['profile__input']} value={profile.email} disabled />
        </label>

        <label>
          Имя
          <input
            type='text'
            className={styles['profile__input']}
            {...register('name')}
            defaultValue={profile.name}
          />
        </label>

        <label>
          Фамилия
          <input
            type='text'
            className={styles['profile__input']}
            {...register('lastName')}
            defaultValue={profile.lastName}
          />
        </label>

        <label>
          Возраст
          <input
            type='number'
            className={styles['profile__input']}
            {...register('age')}
            defaultValue={profile.age}
          />
        </label>

        <button
          type='submit'
          className={styles['profile__submit']}
          disabled={isProfilePending || isLogoutPending || isPending}
        >
          Сохранить
        </button>
      </form>
    </div>
  ) : (
    <Loader />
  )
}
