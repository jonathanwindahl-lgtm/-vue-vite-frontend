<script>
import { useProductsStore } from "../store"

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      productsStore: useProductsStore(),
      product: null,
      selectedSize: "",
      sizeError: "",
      addedMessage: ""
    }
  },

  async mounted() {
    this.product = await this.productsStore.fetchProductById(this.id)
  },

  methods: {
    addToCart() {
      if (!this.selectedSize) {
        this.sizeError = "Du måste välja en storlek"
        return
      }
      this.sizeError = ""
      this.productsStore.addToCart(this.product.id, this.selectedSize)
      this.addedMessage = "Varan har nu lagts i kundvagnen!"
    }
  }
}
</script>

<template>
  <RouterLink to="/">Tillbaka</RouterLink>

  <div v-if="!product">Laddar Produkt...</div>

  <div v-else class="product-detail">
    <img :src="`/${product.imageUrl}`" :alt="product.description" />
    <div>
      <h2>{{ product.description }}</h2>
      <h3>{{ product.price }} kr</h3>

      <label for="size">Storlek</label>
      <div>
        <select v-model="selectedSize" required>
          <option disabled value="">Välj storlek</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
          <option value="45">45</option>
        </select>
      </div>
      <p v-if="sizeError" class="error">{{ sizeError }}</p>
      <p v-if="addedMessage" class="success">{{ addedMessage }}</p>

      <button class="btn" @click="addToCart">Lägg i kundvagn</button>

      <section id="product-info">
        <h3>Produktinformation</h3>
        <ul>
          <li>Färg: {{ product.color }}</li>
          <li>Löpstil: {{ product.style }}</li>
          <li>Dämpning: {{ product.damping }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
* {
  font-weight: bold;
}
.product-detail {
  display: flex;
  justify-content: center;
  padding: 1rem;
  color: #0077cc;
  align-items: center;
}

.error {
  color: red;
}

.success {
  color: green;
}

.product-detail img {
  width: 50%;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
}
a {
  color: #0077cc;
  text-decoration: none;
  font-weight: bold;
}

#product-info {
  margin: 20px;
}

select {
  color: #0077cc;
  padding: 10px;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  width: 200px;
}

.btn {
  background-color: #0077cc;
  color: white;
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  display: inline-block;
  width: 200px;
  margin-top: 10px;
}

ul {
  padding: 0;
}
</style>
