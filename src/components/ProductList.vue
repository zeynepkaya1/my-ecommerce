<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="product in products"
      :key="product.id"
      class="border p-4 rounded-lg"
    >
      <h2 class="text-lg font-bold">{{ product.name }}</h2>
      <p class="text-sm text-gray-500">{{ product.details.description }}</p>
      <p class="text-xl font-semibold">
        {{ product.details.price }}
      </p>
      <router-link :to="'/product/' + product.id">
        <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          View Details
        </button>
      </router-link>
      <button
        @click="addToCart(product)"
        class="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import productsData from "../assets/graphql-products.json";
import { useCartStore } from "../store/cartStore";

const cartStore = useCartStore();
const products = productsData;

function addToCart(product: any) {
  cartStore.addProductToCart(product);
}
</script>
