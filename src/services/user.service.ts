import { api } from './api'

export interface RegisterUserData {
  name: string
  email: string
  password: string
}

export interface RegisterUserResponse {
  id: number
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

export const createUser = async (data: RegisterUserData) => {
  const response = await api.post<RegisterUserResponse>('/users', data)
  return response.data
}
