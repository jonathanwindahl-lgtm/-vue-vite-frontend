<script>
import ProductCard from '../components/ProductCard.vue';
import { useProductsStore } from '../store';

  export default {

    props: {
      searchText:String
    },

    components:{
      ProductCard
    },

    data() {
      return {
        productsStore: useProductsStore()
      }
    },

    mounted() {

      if (this.productsStore.products.length === 0) {
      this.productsStore.fetchProducts()
    }
    },


    computed: {
      filteredItems() {
        if (this.searchText) {
          return this.productsStore.products.filter(p =>
          p.description.toLowerCase().includes(this.searchText.toLowerCase()))

      }
          return this.productsStore.products
      },

      loading() {

        return this.productsStore?.loading
      }
      },

      methods: {

        shuffleArray(array){
          return array
          .map (value => ({value, sort: Math.random()}))
          .sort((a,b) => a.sort - b.sort)
          .map(({value}) => value)

        }
      },

    watch: {
      searchText(newtext, oldText) {

        console.log(oldText+ " Har ändrats till " + newtext)
      }
    }
}
</script>

<template>

  <h2 style="color:#0077CC;">Populära produkter</h2>

    <section class ="product-grid">

    <p v-if="loading">Laddar produkter...</p>

    <ProductCard v-for="p in filteredItems" :key="p.id" :product="p"/>

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
