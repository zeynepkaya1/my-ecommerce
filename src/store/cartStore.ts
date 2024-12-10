import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as {
      id: string;
      name: string;
      details: any;
      quantity: number;
    }[],
  }),
  actions: {
    addProductToCart(product: any) {
      const existingItem = this.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeProductFromCart(productId: string) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    },
  },
  getters: {
    cartTotal(): number {
      return this.cartItems.reduce(
        (total, item) => total + item.details.price * item.quantity,
        0
      );
    },
  },
});
