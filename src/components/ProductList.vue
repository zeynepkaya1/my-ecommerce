<template>
  <div class="p-4">
    <!-- Search Bar -->
    <div class="mb-4 flex justify-center">
      <div class="relative w-full max-w-xs">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full p-2 pl-10 border border-teal-900 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-900 bg-transparent text-black placeholder-black"
        />
        <!-- Search Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5 text-black"
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
    <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white shadow-xl border-teal p-6 rounded-lg flex flex-col justify-between h-full"
      >
        <div>
          <h2 class="text-lg font-bold">{{ product.name }}</h2>
          <p class="text-sm text-gray-500 mt-2">
            {{ product.details.description }}
          </p>
          <p class="text-xl font-semibold mt-2">
            € {{ product.details.price.toFixed(2) }}
          </p>
        </div>

        <!-- Buttons -->
        <div class="mt-4 flex justify-evenly">
          <router-link :to="'/product/' + product.id">
            <button
              class="bg-teal-800 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              View Details
            </button>
          </router-link>
          <button
            @click="addToCart(product)"
            class="bg-orange-800 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
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

input::placeholder {
  color: #000;
}

svg {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
}
</style>
