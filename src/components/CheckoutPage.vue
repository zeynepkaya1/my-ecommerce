<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Checkout Receipt</h1>
    <div v-if="cartItems.length">
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2">Product Name</th>
            <th class="border border-gray-300 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td class="border border-gray-300 px-4 py-2">{{ item.name }}</td>
            <td class="border border-gray-300 px-4 py-2">
              {{ item.details.price }}
            </td>
          </tr>
        </tbody>
      </table>
      <p class="font-bold mt-4">Total: {{ cartTotal }}</p>
    </div>
    <p v-else>Your cart is empty!</p>
    <router-link to="/">
      <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Back to Home
      </button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../store/cartStore";

const cartStore = useCartStore();
const cartItems = cartStore.cartItems;
const cartTotal = cartStore.cartTotal;
</script>

<style scoped>
table {
  margin-top: 1rem;
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 8px;
}
</style>
