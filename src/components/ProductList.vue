<template>
  <div class="p-4">
    <!-- Search Bar -->
    <div class="mb-4 flex justify-center">
      <div class="relative w-full max-w-xs">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full p-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <!-- Search Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
          />
        </svg>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="border p-4 rounded-lg"
      >
        <h2 class="text-lg font-bold">{{ product.name }}</h2>
        <p class="text-sm text-gray-500">{{ product.details.description }}</p>
        <p class="text-xl font-semibold">
          €{{ product.details.price.toFixed(2) }}
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import productsData from "../assets/graphql-products.json";
import { useCartStore } from "../store/cartStore";

// Access the cart store
const cartStore = useCartStore();

// Local state for search query
const searchQuery = ref("");

// Reactive product data
const products = ref(productsData);

// Computed property for filtering products
const filteredProducts = computed(() =>
  products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// Add product to the cart
function addToCart(product: any) {
  cartStore.addProductToCart(product);
}
</script>

<style scoped>
input {
  border: 2px solid #ccc;
  border-radius: 9999px;
  font-size: 1rem;
  padding-right: 2rem;
}

input:focus {
  border-color: #2563eb;
}

input::placeholder {
  color: #aaa;
}

svg {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
}
</style>
