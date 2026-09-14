<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CalendarDays, Clock3, MapPin } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { getEvents, type Event } from '@/services/event.service'

const events = ref<Event[]>([])
const loading = ref(true)

const loadEvents = async () => {
  try {
    events.value = await getEvents()
  } catch {
    toast.error('No se pudieron cargar los eventos.')
  } finally {
    loading.value = false
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
        </article>
      </div>
    </section>
  </main>
</template>
