<script setup lang="ts">
import TheNavbar from "./components/anime/TheNavbar.vue";
import TheFooter from "./components/anime/TheFooter.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="anivault-app-shell d-flex flex-column min-vh-100">
    <TheNavbar />
    <div class="flex-grow-1">
      <RouterView />
    </div>
    <TheFooter />
  </div>
</template>

<style scoped></style>
