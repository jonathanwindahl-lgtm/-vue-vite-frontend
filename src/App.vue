<script>
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"

export default {
  components: {
    Footer,
    Header
  },

  data() {
    return {
      searchText: ""
    }
  }
}
</script>

<template>
  <div class="container">
    <Header v-if="$route.path !== '/login' && $route.path !== '/register'" v-model="searchText" />
    <RouterView v-slot="{ Component, route }">
      <component v-if="route.name === 'home'" :is="Component" :searchText="searchText" />
      <component v-else :is="Component" />
    </RouterView>
    <Footer v-if="$route.path !== '/login' && $route.path !== '/register'" />
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
