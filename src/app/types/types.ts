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
