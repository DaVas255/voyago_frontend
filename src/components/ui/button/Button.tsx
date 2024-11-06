import { forwardRef } from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  name: string
  disabled?: boolean
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className={clsx(styles.button, className)}
      ref={ref}
      {...props}
    >
      {props.name}
    </button>
  )
})
