import { AuthForm } from '@/components/features/AuthForm/AuthForm'
import { useState } from 'react'

export const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)
  return <AuthForm isLogin={isLoginForm} setIsLoginForm={setIsLoginForm} />
}
