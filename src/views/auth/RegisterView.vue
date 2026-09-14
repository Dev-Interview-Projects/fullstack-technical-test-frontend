<script setup lang="ts">
import { ref } from 'vue'
import { UserPlus, User, Mail, Lock, Eye, EyeOff } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { createUser } from '@/services/user.service'

const showPassword = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')

const registerUser = async () => {
  try {
    await createUser({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    toast.success('Usuario registrado exitosamente. Por favor, inicia sesión.')

    name.value = ''
    email.value = ''
    password.value = ''
  } catch {
    toast.error('Error al registrar el usuario. Por favor, inténtalo de nuevo.')
  }
}
</script>

<template>
  <main class="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-10 sm:px-6 sm:py-16">
    <div class="mx-auto w-full max-w-md">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div class="text-center">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">Crear una cuenta</h1>

          <p class="mt-2 text-sm leading-6 text-gray-600">
            Regístrate para poder reservar tus tickets.
          </p>
        </div>

        <form class="mt-8 space-y-5" @submit.prevent="registerUser">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"> Nombre </label>

            <div class="relative mt-2">
              <User
                class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              />

              <input
                id="name"
                v-model="name"
                type="text"
                name="name"
                autocomplete="name"
                placeholder="Tu nombre"
                class="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>

            <div class="relative mt-2">
              <Mail
                class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="correo@ejemplo.com"
                class="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Contraseña
            </label>

            <div class="relative mt-2">
              <Lock
                class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              />

              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                autocomplete="new-password"
                placeholder="••••••••"
                class="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-11 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
              />

              <button
                type="button"
                :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                class="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <UserPlus class="h-4 w-4" />
            Crear cuenta
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?
          <RouterLink
            to="/login"
            class="font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Inicia sesión
          </RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>
