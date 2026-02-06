<script>
import ProductCard from '../components/ProductCard.vue';
import axios from 'axios';

  export default {

    props: {
      searchText:String
    },

    components:{
      ProductCard,
    },

    data() {
      return {
        products: [],
      };
    },

    mounted() {
      axios
        .get("https://6915a1dc84e8bd126afabb7f.mockapi.io/Products")
        .then(response =>(this.products = this.shuffleArray(response.data)))
  },

    computed: {
      filteredItems() {
        if (this.searchText) {
          return this.products.filter(p => p.description.toLowerCase().includes(this.searchText.toLowerCase()))

      }
          return this.products
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

    <p v-if="products.length === 0">Laddar produkter...</p>

    <ProductCard v-for="p in filteredItems" :key="p.id" :product="p"/>

  </section>
</template>

<style>
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}



</style>
