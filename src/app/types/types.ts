export interface IFormData {
  email: string
  password: string
  confirm_password?: string
}

export interface AuthFormProps {
  isLogin: boolean;
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUser {
  email: string
  name: string
  lastName: string
  age: number
}

export interface IOrder {
  id: number
  title: string
  description: string
  location: string
  startDate: string
  endDate: string;
  isCompleted: boolean
  user: { name: string }
}
