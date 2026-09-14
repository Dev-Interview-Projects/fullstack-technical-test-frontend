import { api } from './api'

export interface Event {
  id: number
  title: string
  description: string | null
  date: string
  location: string
  createdAt: string
  updatedAt: string
}

export const getEvents = async () => {
  const response = await api.get<Event[]>('/events')
  return response.data
}
