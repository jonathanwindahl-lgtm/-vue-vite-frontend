<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useProductsStore } from "../store"

const store = useProductsStore()
const discountCode = ref("")
const discountMessage = ref("")
const isLoggedIn = ref(false)
const discountApplied = ref(false)

const totalProductPrice = computed(() => store.totalProductPrice)
const shippingCost = computed(() => store.shippingCost)
const totalPrice = computed(() => {
  let total = store.totalProductPrice + store.shippingCost
  if (discountApplied.value) total *= 0.75
  return total.toFixed(2)
})
const increaseQuantity = (item) => store.increaseQuantity(item.id, item.size)
const decreaseQuantity = (item) => store.decreaseQuantity(item.id, item.size)
const emptyCart = () => store.clearCart()

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts()
  }
  isLoggedIn.value = JSON.parse(localStorage.getItem("isLoggedIn")) || false
})

const applyDiscount = () => {
  if (discountCode.value === "VIP25") {
    discountApplied.value = true
    discountMessage.value = "Rabattkod använd!"
  } else {
    discountMessage.value = "Fel rabattkod."
  }
}

watch(
  () => store.cart,
  (newCart) => {
    if (newCart.length === 0) {
      discountApplied.value = false
      discountMessage.value = ""
      discountCode.value = ""
    }
  },
  { deep: true }
)
</script>

<template>
  <main>
    <div class="text-main">
      <h2>KASSAN</h2>

      <section v-if="store.cart.length === 0">
        <p>Din varukorg är tom.</p>
      </section>

      <section v-else class="cart-list">
        <article v-for="item in store.cartWithProducts" :key="item.id + item.size">
          <img :src="item.product?.imageUrl" width="100" />

          <div>
            <h3>{{ item.product?.description }}</h3>
            <p>Pris: {{ item.product?.price }}</p>
            <p>Storlek: {{ item.size }}</p>

            <div class="quantity-buttons">
              <button @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
          </div>
        </article>
      </section>

      <section class="discount" v-if="isLoggedIn">
        <p>Som inloggad kund får du använda rabattkod! Använd "VIP25"</p>
        <input v-model="discountCode" type="text" placeholder="Skriv rabattkod här" />
        <button @click="applyDiscount">Använd kod</button>
        <p>{{ discountMessage }}</p>
      </section>

      <section>
        <p>Varor: {{ totalProductPrice }} kr</p>
        <p>Frakt: {{ shippingCost }} kr</p>
        <p>Att betala: {{ totalPrice }} kr</p>
      </section>

      <div>
        <button class="btn" @click="emptyCart">Töm Varukorgen</button>
      </div>

      <button class="btn">Gå vidare till betalningen</button>
    </div>
  </main>
</template>

<style scoped>
.btn {
  background-color: #0077cc;
  color: white;
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  display: inline-block;
  width: 250px;
  margin-top: 10px;
  height: 50px;
}

.text-main {
  font-size: large;
  color: #0077cc;
}

.discount {
  margin: 10px 0 10px;
}
</style>
