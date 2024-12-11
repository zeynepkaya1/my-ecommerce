<template>
  <nav
    class="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-teal-800 shadow-md z-50"
  >
    <!-- Left: Home Link -->
    <div class="px-9 text-xl font-semibold">
      <router-link
        to="/"
        class="text-white hover:text-orange-800 transition-colors duration-300"
        >Home</router-link
      >
    </div>

    <!-- Right: Cart Icon -->
    <div class="px-9 relative">
      <router-link
        to="/cart"
        class="flex items-center text-white hover:text-orange-800 transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 8h16m-9 5a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
        <!-- Cart Item Count -->
        <span
          v-if="cartItemCount > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 mx-7"
        >
          {{ cartItemCount }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue"; // Used for reactivity
import { useCartStore } from "../store/cartStore";

// Access the cart store
const cartStore = useCartStore();

// Create a computed property for cart item count
const cartItemCount = computed(() => cartStore.cartItems.length);
</script>

<style scoped>
nav {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
