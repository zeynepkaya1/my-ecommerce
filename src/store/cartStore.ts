import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as {
      id: string;
      name: string;
      details: any;
      quantity: number;
    }[],
    cartTotal: 0,
    receipt: null as {
      receipt: Array<{
        name: string;
        quantity: number;
        price: number;
        total: string;
      }>;
      total: string;
    } | null,
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
      this.calculateCartTotal();
    },

    removeProductFromCart(productId: string) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      this.calculateCartTotal();
    },

    // Update product quantity
    updateProductQuantity(productId: string, delta: number) {
      const product = this.cartItems.find((item) => item.id === productId);

      if (product) {
        product.quantity += delta;

        if (product.quantity < 1) {
          this.cartItems = this.cartItems.filter(
            (item) => item.id !== productId
          );
        }

        this.calculateCartTotal();
      }
    },

    // Recalculate cart total
    calculateCartTotal() {
      this.cartTotal = this.cartItems.reduce(
        (total, item) => total + item.details.price * item.quantity,
        0
      );
    },

    clearCart() {
      this.cartItems = [];
      this.cartTotal = 0;
    },

    setReceipt(receiptData: {
      receipt: Array<{
        name: string;
        quantity: number;
        price: number;
        total: string;
      }>;
      total: string;
    }) {
      this.receipt = receiptData;
    },
  },

  // To access the cart total dynamically
  getters: {
    cartTotalAmount(): number {
      return this.cartItems.reduce(
        (total, item) => total + item.details.price * item.quantity,
        0
      );
    },
  },
});
