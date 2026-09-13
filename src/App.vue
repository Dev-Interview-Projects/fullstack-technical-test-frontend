<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<template>
  <Toaster richColors position="top-right" closeButton />

  <router-view />
</template>
