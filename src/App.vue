<script setup lang="ts"></script>

<template>
  <div>
    <header
      class="flex justify-between items-center p-4 bg-gray-800 text-white"
    >
      <nav class="p-4 bg-gray-800 text-white">
        <router-link to="/" class="mr-4">Home</router-link>
        <router-link to="/cart">Cart</router-link>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
nav {
  display: flex;
  justify-content: space-between;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
