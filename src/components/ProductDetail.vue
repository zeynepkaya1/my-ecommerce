<template>
  <div v-if="product" class="product-detail">
    <h2 class="text-2xl font-bold">{{ product.name }}</h2>
    <p class="text-sm text-gray-500">{{ product.details.description }}</p>
    <p class="text-xl font-semibold">{{ product.details.price }}</p>

    <div class="product-info">
      <p><strong>Company:</strong> {{ product.details.company }}</p>
      <p>
        <strong>Created At:</strong>
        {{ new Date(product.details.createdAt).toLocaleDateString() }}
      </p>
      <p>
        <strong>Last Updated:</strong>
        {{ new Date(product.details.updatedAt).toLocaleDateString() }}
      </p>
    </div>

    <button
      @click="addToCart(product)"
      class="bg-blue-500 text-white px-4 py-2 rounded mt-4"
    >
      Add to Cart
    </button>
  </div>

  <div v-else>
    <p>Loading product details...</p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../store/cartStore";
import { useRoute } from "vue-router";
import productsData from "../assets/graphql-products.json";

const cartStore = useCartStore();
const route = useRoute();
const productId = route.params.id as string;

// Find the product based on the ID
const product = productsData.find((p) => p.id === productId);

function addToCart(product: any) {
  cartStore.addProductToCart(product);
}
</script>

<style scoped>
.product-detail {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
}
.product-info {
  margin-top: 1rem;
}
</style>
