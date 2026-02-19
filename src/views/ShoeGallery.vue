<script>
import ProductCard from "../components/ProductCard.vue"
import { useProductsStore } from "../store"
import ProductFilter from "../components/ProductFilter.vue"

export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },

  components: {
    ProductCard,
    ProductFilter
  },

  data() {
    return {
      productsStore: useProductsStore(),
      filterResult: []
    }
  },

  mounted() {
    if (this.productsStore.products.length === 0) {
      this.productsStore.fetchProducts()
    }
  },

  computed: {
    filteredItems() {
      let items = this.filterResult.length ? this.filterResult : this.productsStore.products
      if (this.searchText) {
        return items.filter((p) =>
          p.description.toLowerCase().includes(this.searchText.toLowerCase())
        )
      }
      return items
    },

    loading() {
      return this.productsStore?.loading
    }
  }
}
</script>

<template>
  <h2 style="color: #0077cc">Populära produkter</h2>

  <ProductFilter @filtered="filterResult = $event" />

  <section class="product-grid">
    <p v-if="loading">Laddar produkter...</p>

    <ProductCard v-for="p in filteredItems" :key="p.id" :product="p" />
  </section>
</template>

<style>
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media screen and (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-section {
    flex-direction: column;
  }
}

@media screen and (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
