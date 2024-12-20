import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../components/ProductList.vue";
import ProductDetail from "../components/ProductDetail.vue";
import CartPage from "../components/CartPage.vue";
import CheckoutPage from "../components/CheckoutPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ProductList,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: CheckoutPage,
  },
];

const router = createRouter({
  history: createWebHistory("/my-ecommerce/"),
  routes,
});

export default router;
