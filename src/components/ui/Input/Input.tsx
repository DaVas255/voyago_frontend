import { forwardRef, useState } from 'react'
import clsx from 'clsx'
import { FieldError } from 'react-hook-form'

import styles from './Input.module.scss'
import Eye from '@/app/assets/icons/eye.svg?react'
import EyeSlash from '@/app/assets/icons/eye-slash.svg?react'

interface InputProps {
  type: string
  placeholder?: string
  value?: string
  defaultValue?: any
  disabled?: boolean
  error?: FieldError
  errorText?: string
  className?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, error, errorText, disabled, onChange, ...props }, ref) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
      setPasswordVisible(!isPasswordVisible)
    }

    return (
      <div className={styles['input-container']}>
        <input
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          placeholder={placeholder}
          className={clsx(styles.input, error && styles['input-error'])}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <button
            type='button'
            className={styles['toggle-password']}
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {isPasswordVisible ? <EyeSlash /> : <Eye />}
          </button>
        )}
        {error && <label className={styles['input__error-label']}>{errorText}</label>}
      </div>
    )
  },
)
