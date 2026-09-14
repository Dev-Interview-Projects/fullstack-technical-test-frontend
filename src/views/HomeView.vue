<script setup lang="ts">
import { ArrowRight, LogIn } from '@lucide/vue'
</script>

<template>
  <main>
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div class="max-w-3xl">
          <h1
            class="text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Descubre eventos y reserva tus tickets fácilmente
          </h1>

          <p
            class="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8"
          >
            Encuentra eventos, consulta los tickets disponibles y realiza tus reservas de forma
            rápida y sencilla.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <RouterLink
              to="/events"
              class="group flex items-center justify-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 hover:shadow-md"
            >
              Explorar eventos
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </RouterLink>

            <RouterLink
              to="/register"
              class="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogIn class="h-4 w-4" />
              Crear una cuenta
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
