<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import AppFooter from "./components/AppFooter.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <NavBar />
  <RouterView />
  <AppFooter />
</template>

<style scoped></style>
