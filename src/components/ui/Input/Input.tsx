import { forwardRef } from 'react'
import styles from './Input.module.scss'
import clsx from 'clsx'
import { FieldError } from 'react-hook-form'

interface InputProps {
  type: string
  placeholder?: string
  value?: string
  defaultValue?: any
  disabled?: boolean
  error?: FieldError
  errorText?: string
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, error, errorText, disabled, ...props }, ref) => {
    return (
      <div className={styles['input-container']}>
        <input
          type={type}
          placeholder={placeholder}
          className={clsx(styles.input, error && styles['input-error'])}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {error && <label className={styles['input__error-label']}>{errorText}</label>}
      </div>
    )
  },
)
