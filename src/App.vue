<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import AppNavbar from './components/NavbarComponent.vue'
</script>

<template>
  <Toaster richColors position="top-right" closeButton />
  <AppNavbar />
  <router-view />
</template>
