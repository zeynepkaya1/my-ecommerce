<template>
  <div class="checkout-container mx-auto max-w-lg mt-6">
    <div class="checkout-card bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-6 text-center">Checkout Receipt</h1>

      <!-- Check if receipt items exist -->
      <div v-if="receiptItems.length">
        <!-- Receipt Table -->
        <table class="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr class="font-semibold text-sm text-black-800 border-b-2">
              <th class="px-4 py-2 text-left">Product</th>
              <th class="px-4 py-2 text-left">Quantity</th>
              <th class="px-4 py-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in receiptItems"
              :key="index"
              class="border-b"
            >
              <td class="px-4 py-2">{{ item.name }}</td>
              <td class="px-4 py-2">x{{ item.quantity }}</td>
              <td class="px-4 py-2">€ {{ item.total }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Receipt Total -->
        <div class="font-semibold text-lg text-right mt-4 border-t pt-4 px-10">
          <p>Total: € {{ receiptTotal }}</p>
        </div>

        <!-- Back to Home Button -->
        <div class="mt-4 text-center">
          <router-link to="/">
            <button
              class="bg-teal-800 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              Back to Home
            </button>
          </router-link>
        </div>
      </div>

      <!-- If receipt is empty -->
      <div v-else class="text-center text-gray-500">
        <p>Your cart is empty!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../store/cartStore";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { receipt } = storeToRefs(cartStore);

const receiptItems = receipt.value?.receipt || [];
const receiptTotal = receipt.value?.total || "0.00";
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin-top: 2rem;
}

.checkout-card {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}

td.text-right {
  text-align: right;
}

td.text-center {
  text-align: center;
}

button {
  margin-top: 16px;
}
</style>
