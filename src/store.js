import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await axios.get("https://6915a1dc84e8bd126afabb7f.mockapi.io/Products")
        this.products = response.data
      } finally {
        this.loading = false
      }
    }
  }
})
