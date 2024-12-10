<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar />
    <main class="pt-10">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
