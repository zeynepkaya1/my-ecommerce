<template>
  <div class="cart bg-white shadow-xl rounded-lg p-6 mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-black-900">Shopping Cart</h2>

    <div v-if="cartItems.length > 0">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex justify-between items-center border-b py-4"
      >
        <!-- Product Info -->
        <div class="flex-1 text-left">
          <h3 class="text-lg font-semibold text-black-900">{{ item.name }}</h3>
          <p class="text-sm text-gray-500">{{ item.details.description }}</p>
        </div>

        <!-- Price and Quantity -->
        <div class="flex items-center gap-4">
          <p class="text-xl font-semibold text-teal-700">
            € {{ item.details.price.toFixed(2) }}
          </p>
          <div class="flex items-center border rounded-full overflow-hidden">
            <button
              @click="decreaseQuantity(item.id)"
              class="bg-red-400 text-white px-3 py-2 hover:bg-red-700"
            >
              -
            </button>
            <p class="px-4">{{ item.quantity }}</p>
            <button
              @click="increaseQuantity(item.id)"
              class="bg-green-400 text-white px-3 py-2 hover:bg-green-700"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="mt-6 text-center">
        <h3 class="text-xl font-bold text-teal-800 mb-4">
          Total: € {{ cartTotal.toFixed(2) }}
        </h3>
        <router-link to="/checkout">
          <button
            class="bg-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            Proceed to Checkout
          </button>
        </router-link>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-gray-500">Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../store/cartStore";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { cartItems, cartTotal } = storeToRefs(cartStore);

function increaseQuantity(productId: string) {
  cartStore.updateProductQuantity(productId, 1);
}

function decreaseQuantity(productId: string) {
  cartStore.updateProductQuantity(productId, -1);
}
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin-top: 2rem;
}
</style>
