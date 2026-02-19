import { defineStore } from "pinia"
import axios from "axios"

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    loading: false,
    cart: JSON.parse(localStorage.getItem("cart")) || []
  }),

  getters: {
    cartCount: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),

    cartWithProducts: (state) =>
      state.cart.map((item) => {
        const product = state.products.find((p) => p.id == item.id)
        return { ...item, product }
      }),

    totalProductPrice: (state) => {
      return state.cart.reduce((total, item) => {
        const product = state.products.find((p) => p.id == item.id)
        return total + (product?.price || 0) * item.quantity
      }, 0)
    },

    shippingCost: (state) => {
      const total = state.cart.reduce((sum, item) => {
        const product = state.products.find((p) => p.id == item.id)
        return sum + (product?.price || 0) * item.quantity
      }, 0)
      return total >= 1000 ? 0 : 49
    }
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await axios.get("https://6915a1dc84e8bd126afabb7f.mockapi.io/Products")
        this.products = response.data
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id) {
      const response = await axios.get(`https://6915a1dc84e8bd126afabb7f.mockapi.io/Products/${id}`)
      return response.data
    },

    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart))
    },

    addToCart(productId, size) {
      const id = Number(productId)
      const existing = this.cart.find((i) => i.id === id && i.size === size)
      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({ id, size, quantity: 1 })
      }
      this.saveCart()
    },

    increaseQuantity(id, size) {
      const item = this.cart.find((i) => i.id === id && i.size === size)
      if (item) {
        item.quantity++
        this.saveCart()
      }
    },

    decreaseQuantity(id, size) {
      const item = this.cart.find((i) => i.id === id && i.size === size)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.cart = this.cart.filter((i) => !(i.id === id && i.size === size))
      }
      this.saveCart()
    },
    clearCart() {
      this.cart = []
      localStorage.removeItem("cart")
    }
  }
})
