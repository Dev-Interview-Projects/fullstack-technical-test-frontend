import { api } from './api'

export interface RegisterUserData {
  name: string
  email: string
  password: string
}

export const createUser = async (data: RegisterUserData) => {
  return api.post('/users', data)
}
