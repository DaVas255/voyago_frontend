import { useEffect, useState, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import styles from './ProfileForm.module.scss'
import { getProfile, updateProfile } from '@/service/user.service'
import { IUser } from '@/app/types/types'
import { Loader } from '@/components/ui/Loader/Loader'
import { SubmitHandler, useForm } from 'react-hook-form'
import { logout } from '@/service/auth/auth.service'
import { getAccessToken } from '@/service/auth/auth.helper'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button/Button'
import ExitDoorIcon from '@/app/assets/icons/ExitDoor.svg?react'

export const ProfileForm = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<IUser>()
  const { register, handleSubmit, reset } = useForm<IUser>()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (getAccessToken()) {
      getProfile()
        .then(data => setProfile(data))
        .catch(error => console.error(error))
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
    <div className={styles.profile}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.profile__form}>
        <h2 className={styles.profile__title}>Привет {profile.name}!</h2>
        <Input type='text' value={profile.email} disabled />
        <Input type='text' placeholder='Имя' defaultValue={profile.name} {...register('name')} />
        <Input
          type='text'
          placeholder='Фамилия'
          defaultValue={profile.lastName}
          {...register('lastName')}
        />
        <Input
          type='number'
          placeholder='Возраст'
          defaultValue={profile.age}
          {...register('age')}
        />
        <Button
          type='submit'
          name='Сохранить'
          background
          disabled={isProfilePending || isLogoutPending || isPending}
        />
      </form>
      <button
        className={styles.profile__logout}
        onClick={() => mutateLogout()}
        disabled={isProfilePending || isLogoutPending || isPending}
      >
        <ExitDoorIcon />
        Выйти
      </button>
    </div>
  ) : (
    <Loader />
  )
}
