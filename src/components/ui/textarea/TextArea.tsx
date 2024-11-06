import { forwardRef } from 'react'
import styles from './TextArea.module.scss'

interface TextAreaProps {
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, ...props }, ref) => {
    return (
      <textarea
        placeholder={placeholder}
        className={styles.textarea}
        ref={ref}
        {...props}
      ></textarea>
    )
  },
)
