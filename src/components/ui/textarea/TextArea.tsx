import { forwardRef } from 'react'
import styles from './TextArea.module.scss'

interface TextAreaProps {
  placeholder?: string
  disabled?: boolean
  className?: string
  rows?: number
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, rows, ...props }, ref) => {
    return (
      <textarea
        placeholder={placeholder}
        className={styles.textarea}
        rows={rows}
        ref={ref}
        {...props}
      ></textarea>
    )
  },
)
