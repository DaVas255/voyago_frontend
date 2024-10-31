import { forwardRef } from 'react'
import styles from './Input.module.scss'

interface InputProps {
  type: string
  placeholder?: string
  value?: string
  defaultValue?: any
  disabled?: boolean
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, ...props }, ref) => {
    return (
      <input type={type} placeholder={placeholder} className={styles.input} ref={ref} {...props} />
    )
  },
)
