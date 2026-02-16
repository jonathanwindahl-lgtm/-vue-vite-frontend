<script>

import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Composition from "./components/SearchBar.vue";

  export default {
    components: {
      Composition,
      Footer,
      Header
    },

    data () {

      return {
        searchText:"",
        cartCount: 0
      }
    },
    methods: {
      updateCartCount (count) {
        this.cartCount = count
      }
    }
  };
</script>

<template>
  <div class="container">
  <Header v-if="$route.path !== '/login' && $route.path !== '/register'" v-model="searchText" :cartCount="cartCount"/>
  <RouterView :searchText="searchText" @cart-count="updateCartCount"/>
  <Footer  v-if="$route.path !== '/login' && $route.path !== '/register'"/>
</div>
</template>

<style>
.container {
  max-width: 1700px;
  margin: 0 auto;
  padding: 0 20px;
}

* {
  margin: 0;
  line-height: 1.5;
  font-family: sans-serif;
}

</style>
