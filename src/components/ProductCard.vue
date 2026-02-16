<script setup>
import { RouterLink } from 'vue-router';

const {product} = defineProps ({ product: Object})

</script>

<template>

<RouterLink :to="`/product/${product.id}`">
  <article class="product-card">

<img :src="`${import.meta.env.BASE_URL}${product.imageUrl}`" :alt="product.description" />

    <h3> {{ product.description}}</h3>
     <h4>{{ product.price }} kr</h4>
    </article>
     </RouterLink>
</template>

<style scoped>

.product-card {

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3 ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}

.product-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

a {
  color: #0077CC;
  text-decoration: none;
  font-weight: bold;
}



</style>
