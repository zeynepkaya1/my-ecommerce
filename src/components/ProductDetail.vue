<template>
  <div
    v-if="product"
    class="product-detail bg-white shadow-xl rounded-lg p-6 mx-auto"
  >
    <!-- Card Layout -->
    <div class="flex flex-col md:flex-row gap-6 pt-4">
      <!-- Left Section: Product Details -->
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-black-800">{{ product.name }}</h2>
        <p class="text-gray-600 mt-2">{{ product.details.description }}</p>
        <p class="text-xl font-semibold text-black-700 mt-4">
          € {{ product.details.price }}
        </p>
      </div>

      <!-- Right Section: Additional Info -->
      <div class="flex-1">
        <p class="text-gray-800">
          <strong>Company:</strong> {{ product.details.company }}
        </p>
        <p class="text-gray-800 mt-2">
          <strong>Created At:</strong>
          {{ new Date(product.details.createdAt).toLocaleDateString() }}
        </p>
        <p class="text-gray-800 mt-2">
          <strong>Last Updated At:</strong>
          {{ new Date(product.details.updatedAt).toLocaleDateString() }}
        </p>
        <p class="text-gray-800 mt-2">
          <strong>Date of Birth:</strong>
          {{ new Date(product.details.dob).toLocaleDateString() }}
        </p>
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-6 flex justify-between items-center px-12">
      <button
        @click="goBack"
        class="bg-teal-800 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
      >
        Back
      </button>

      <button
        @click="addToCart(product)"
        class="bg-orange-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
      >
        Add to Cart
      </button>
    </div>
  </div>

  <div v-else>
    <p>Loading product details...</p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../store/cartStore";
import { useRoute, useRouter } from "vue-router";
import productsData from "../assets/graphql-products.json";

const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const productId = route.params.id as string;

// Find the product based on the ID
const product = productsData.find((p) => p.id === productId);

function addToCart(product: any) {
  cartStore.addProductToCart(product);
}

// Go back to the previous page
function goBack() {
  router.back();
}
</script>

<style scoped>
.product-detail {
  max-width: 900px;
  margin-top: 2rem;
}
</style>
