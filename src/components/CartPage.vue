<template>
  <div class="cart bg-white shadow-xl rounded-lg p-6 mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-black-900">Shopping Cart</h2>

    <div v-if="cartItems.length > 0">
      <!-- Cart Table -->
      <div
        class="grid grid-cols-5 gap-4 items-center font-semibold text-sm text-black-800 border-b-2 pb-2 mb-4"
      >
        <div>Product</div>
        <div>Base Price</div>
        <div>Quantity</div>
        <div>Price with Quantity</div>
        <div></div>
      </div>

      <!-- Cart Items -->
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="grid grid-cols-5 gap-4 items-center py-4 border-b"
      >
        <!-- Product Info -->
        <div class="text-left">{{ item.name }}</div>

        <!-- Base Price -->
        <div>€ {{ item.details.price.toFixed(2) }}</div>

        <!-- Quantity -->
        <div class="flex items-center justify-center gap-2">
          <button
            @click="decreaseQuantity(item.id)"
            class="bg-red-400 text-white px-2 py-0 hover:bg-red-700"
          >
            -
          </button>
          <p>{{ item.quantity }}</p>
          <button
            @click="increaseQuantity(item.id)"
            class="bg-green-400 text-white px-2 py-0 hover:bg-green-700"
          >
            +
          </button>
        </div>

        <!-- Price * Quantity -->
        <div>€ {{ (item.details.price * item.quantity).toFixed(2) }}</div>

        <!-- Remove -->
        <div>
          <button
            @click="removeFromCart(item.id)"
            class="bg-red-500 text-white p-1 pt-2 rounded-full hover:bg-red-700"
          >
            <i class="material-icons">delete_forever</i>
          </button>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="mt-6 text-right font-semibold text-xl">
        <p class="px-5 pb-2">Total: € {{ cartTotal.toFixed(2) }}</p>
        <router-link to="/checkout">
          <button
            @click="proceedToCheckout"
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
import { useRouter } from "vue-router";
import { useCartStore } from "../store/cartStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const cartStore = useCartStore();
const { cartItems, cartTotal } = storeToRefs(cartStore);

function increaseQuantity(productId: string) {
  cartStore.updateProductQuantity(productId, 1);
}

function decreaseQuantity(productId: string) {
  cartStore.updateProductQuantity(productId, -1);
}

function removeFromCart(productId: string) {
  cartStore.removeProductFromCart(productId);
}

function proceedToCheckout() {
  const receipt = cartItems.value.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.details.price,
    total: (item.details.price * item.quantity).toFixed(2),
  }));

  // Store the receipt in the cart store
  cartStore.setReceipt({ receipt, total: cartTotal.value.toFixed(2) });

  // Clear the cart after storing the receipt
  cartStore.clearCart();

  // Navigate to the checkout page
  router.push({ name: "Checkout" });
}
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin-top: 2rem;
}
</style>
