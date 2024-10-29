import styles from './Input.module.scss'

interface InputProps {
  type: string
  placeholder: string
  innerRef: any
}

export const Input = ({ type, placeholder, innerRef, ...props }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.input}
      ref={innerRef}
      {...props}
    />
  )
}
