import { api } from './api'

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
    role: 'USER' | 'ADMIN'
  }
}

export const loginUser = async (data: LoginData) => {
  const response = await api.post<LoginResponse>('/auth/login', data)
  return response.data
}
