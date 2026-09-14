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

export interface TicketType {
  id: number
  eventId: number
  name: string
  price: string
  quantity: number
  createdAt: string
  updatedAt: string
}

export const getEvents = async () => {
  const response = await api.get<Event[]>('/events')
  return response.data
}

export const getEventById = async (id: number) => {
  const response = await api.get<Event & { ticketTypes: TicketType[] }>(`/events/${id}`)
  return response.data
}
