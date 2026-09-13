<script setup lang="ts">
import { CalendarDays, Ticket, LogIn } from '@lucide/vue'
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
      <RouterLink
        to="/"
        class="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-gray-900 transition-colors hover:text-blue-600 sm:text-xl"
      >
        <Ticket class="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
        Ticket App
      </RouterLink>

      <div class="flex items-center gap-2 sm:gap-3">
        <RouterLink
          to="/events"
          class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 sm:px-4 sm:py-2.5"
        >
          <CalendarDays class="h-4 w-4" />
          <span class="hidden sm:inline">Eventos</span>
        </RouterLink>

        <RouterLink
          to="/login"
          class="flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 hover:shadow-md sm:px-4 sm:py-2.5"
        >
          <LogIn class="h-4 w-4" />
          <span class="hidden sm:inline">Iniciar sesión</span>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
