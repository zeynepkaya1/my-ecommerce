import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import "./style.css";
import App from "./App.vue";
import ProductList from "./components/ProductList.vue";
import ProductDetail from "./components/ProductDetail.vue";
import CartPage from "./components/CartPage.vue";
import CheckoutPage from "./components/CheckoutPage.vue";

// Define the routes
const routes = [
  { path: "/", component: ProductList },
  { path: "/product/:id", component: ProductDetail, name: "ProductDetail" },
  { path: "/cart", component: CartPage, name: "CartPage" },
  { path: "/checkout", component: CheckoutPage, name: "CheckoutPage" },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
