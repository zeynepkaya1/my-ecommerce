<template>
  <div class="cart">
    <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>
    <div v-if="cartItems.length > 0">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex justify-between items-center border-b py-4"
      >
        <div>
          <h3 class="text-lg font-semibold">{{ item.name }}</h3>
          <p class="text-sm text-gray-500">{{ item.details.description }}</p>
          <p class="text-xl font-semibold">{{ item.details.price }}</p>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
        <div class="flex items-center">
          <button
            @click="removeFromCart(item.id)"
            class="bg-red-500 text-white px-4 py-2 rounded ml-4"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="mt-6">
        <h3 class="text-xl font-bold">Total: {{ cartTotal.toFixed(2) }}</h3>
        <router-link to="/checkout">
          <button class="bg-green-500 text-white px-4 py-2 rounded mt-4">
            Proceed to Checkout
          </button>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../store/cartStore";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
console.log(`cartpage`, cartStore);

const { cartItems, cartTotal } = storeToRefs(cartStore); // Use storeToRefs for reactivity
console.log(`cartItems, cartTotal`, cartItems, cartTotal);

function removeFromCart(productId: string) {
  cartStore.removeProductFromCart(productId);
}
</script>

<style scoped>
.cart {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}
</style>
