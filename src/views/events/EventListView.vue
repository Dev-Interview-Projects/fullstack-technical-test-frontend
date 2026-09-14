<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CalendarDays, Clock3, MapPin, ChevronDown, Ticket } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { getEvents, getEventById, type Event, type TicketType } from '@/services/event.service'

const events = ref<Event[]>([])
const loading = ref(true)
const selectedEventId = ref<number | null>(null)
const ticketTypes = ref<TicketType[]>([])
const loadingDetails = ref(false)

const loadEvents = async () => {
  try {
    events.value = await getEvents()
  } catch {
    toast.error('No se pudieron cargar los eventos.')
  } finally {
    loading.value = false
  }
}

const loadEventDetails = async (eventId: number) => {
  if (selectedEventId.value === eventId) {
    selectedEventId.value = null
    ticketTypes.value = []
    return
  }

  selectedEventId.value = eventId
  loadingDetails.value = true
  ticketTypes.value = []

  try {
    const event = await getEventById(eventId)
    ticketTypes.value = event.ticketTypes
  } catch {
    toast.error('No se pudieron cargar los detalles del evento.')
    selectedEventId.value = null
  } finally {
    loadingDetails.value = false
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-EC', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('es-EC', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

onMounted(() => {
  loadEvents()
})
</script>

<template>
  <main class="bg-white">
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Eventos disponibles
        </h1>

        <p class="mt-3 text-base leading-7 text-gray-600">
          Encuentra el evento al que quieres asistir.
        </p>
      </div>

      <div v-if="loading" class="mt-10 text-sm text-gray-500">Cargando eventos...</div>

      <div
        v-else-if="events.length === 0"
        class="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center"
      >
        <p class="text-sm text-gray-600">No hay eventos disponibles.</p>
      </div>

      <div v-else class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="event in events"
          :key="event.id"
          class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
        >
          <h2 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ event.title }}
          </h2>

          <p class="mt-2 text-sm leading-6 text-gray-600">
            {{ event.description || 'Sin descripción disponible.' }}
          </p>

          <div class="mt-6 space-y-3 border-t border-gray-100 pt-5">
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <CalendarDays class="h-4 w-4 shrink-0 text-blue-600" />

              <span>
                {{ formatDate(event.date) }}
              </span>
            </div>

            <div class="flex items-center gap-3 text-sm text-gray-600">
              <Clock3 class="h-4 w-4 shrink-0 text-blue-600" />

              <span>
                {{ formatTime(event.date) }}
              </span>
            </div>

            <div class="flex items-center gap-3 text-sm text-gray-600">
              <MapPin class="h-4 w-4 shrink-0 text-blue-600" />

              <span>
                {{ event.location }}
              </span>
            </div>
          </div>

          <button
            type="button"
            class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-50"
            @click="loadEventDetails(event.id)"
          >
            <span>
              {{ selectedEventId === event.id ? 'Ocultar detalles' : 'Ver detalles' }}
            </span>

            <ChevronDown
              class="h-4 w-4 transition-transform"
              :class="{ 'rotate-180': selectedEventId === event.id }"
            />
          </button>

          <div v-if="selectedEventId === event.id" class="mt-5 border-t border-gray-100 pt-5">
            <h3 class="text-sm font-semibold text-gray-900">Tipos de tickets</h3>

            <div v-if="loadingDetails" class="mt-4 text-sm text-gray-500">Cargando detalles...</div>

            <div v-else-if="ticketTypes.length > 0" class="mt-4 space-y-3">
              <div
                v-for="ticket in ticketTypes"
                :key="ticket.id"
                class="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-3"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600"
                  >
                    <Ticket class="h-4 w-4" />
                  </div>

                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ ticket.name }}
                    </p>

                    <p class="text-xs text-gray-500">{{ ticket.quantity }} disponibles</p>
                  </div>
                </div>

                <span class="text-sm font-semibold text-gray-900"> ${{ ticket.price }} </span>
              </div>
            </div>

            <p v-else class="mt-4 text-sm text-gray-500">No hay tickets disponibles.</p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
