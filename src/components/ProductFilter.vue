<script setup>
import { ref, computed, watch } from "vue"
import { useProductsStore } from "../store"

const emit = defineEmits(["filtered"])
const store = useProductsStore()

const filterStyle = ref("")
const filterDamping = ref("")
const filterColor = ref("")
const filterPrice = ref("")

const priceRange = {
  cheaper: [500, 1000],
  cheap: [1000, 1500],
  average: [1500, 2000],
  expensive: [2000, 2500]
}

const filteredProducts = computed(() => {
  let result = store.products.filter(
    (p) =>
      (!filterStyle.value || p.style === filterStyle.value) &&
      (!filterDamping.value || p.damping === filterDamping.value) &&
      (!filterColor.value || p.color === filterColor.value)
  )
  if (filterPrice.value) {
    const [min, max] = priceRange[filterPrice.value]
    result = result.filter((p) => p.price >= min && p.price <= max)
  }

  return result
})

watch(
  filteredProducts,
  (val) => {
    emit("filtered", val)
  },
  { immediate: true }
)
</script>

<template>
  <div class="filters">
    <select class="form-select" v-model="filterDamping">
      <option value="">All dämpning</option>
      <option value="Mjuk">Mjuk</option>
      <option value="Medel">Medel</option>
      <option value="Fast">Fast</option>
    </select>
    <select class="form-select" v-model="filterStyle">
      <option value="">Alla stilar</option>
      <option value="Neutral">Neutral</option>
      <option value="Stabil">Stabil</option>
    </select>

    <select class="form-select" v-model="filterColor">
      <option value="">Alla färger</option>
      <option value="Svart">Svart</option>
      <option value="Vit">Vit</option>
      <option value="Rosa">Rosa</option>
      <option value="Blå">Blå</option>
    </select>

    <select class="form-select" v-model="filterPrice">
      <option value="">Alla priser</option>
      <option value="cheaper">500-1000 kr</option>
      <option value="cheap">1000-1500 kr</option>
      <option value="average">1500-2000 kr</option>
      <option value="expensive">2000-2500 kr</option>
    </select>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
}
.form-select {
  font-size: medium;
  color: #0077cc;
  padding: 10px;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  margin: 5px;
  width: 160px;
}
</style>
