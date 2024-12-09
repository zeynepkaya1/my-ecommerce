import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as any[], // Store cart items here
  }),
  actions: {
    addProductToCart(product: any) {
      this.cartItems.push(product);
    },
    removeProductFromCart(productId: string) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    },
  },
  getters: {
    cartTotal(): number {
      return this.cartItems.reduce(
        (total, item) => total + item.details.price,
        0
      );
    },
  },
});
