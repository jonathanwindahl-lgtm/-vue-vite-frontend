<script setup>
import {ref, computed, onMounted} from "vue"
import { useProductsStore } from "../store"

const productsStore = useProductsStore()

const cart = ref([])
const discountCode = ref("")
const discountMessage = ref("")
const isLoggedIn = ref(false)
const discountApplied = ref(false)

onMounted(() => {
    if (productsStore.products.length === 0) {
    productsStore.fetchProducts()
    }
  cart.value = JSON.parse(localStorage.getItem("cart")) || []
  isLoggedIn.value = JSON.parse(localStorage.getItem("isLoggedIn")) || false
})

const cartWithProducts = computed (() => {
  return cart.value.map(item => {
    const product = productsStore.products.find(p => p.id == item.id)
    return {
      ...item,
      product
    }
  })
})

const calculateShipping = (total) => {
 return total >= 1000 ? 0 : 49
}

const totalProductPrice = computed (() => {
  return cartWithProducts.value.reduce ((total, item) => {
  return total + (item.product?.price || 0) * item.quantity
  }, 0)
})

const shippingCost = computed(() => {
 return calculateShipping(totalProductPrice.value)
})

const totalPrice = computed (() => {
  let total = totalProductPrice.value + shippingCost.value

  if (discountApplied.value) {
    total *= 0.75
  }
  return total.toFixed(2)
})

const increaseQuantity  = (item) => {

  const cartItem = cart.value.find( i => i.id === item.id && i.size === item.size)

  if(cartItem) {
  cartItem.quantity++
  updateCart()
}
}

const decreaseQuantity  = (item) => {

  const cartItem = cart.value.find( i => i.id === item.id && i.size === item.size)

  if (!cartItem) return

  if (cartItem.quantity > 1) {
    cartItem.quantity--
  } else {
    cart.value = cart.value.filter(
      i => !(i.id === item.id && i.size == item.size)
    )
  }
  updateCart()
}

const updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value))
}

const emptyCart = () => {
  cart.value = []
  localStorage.removeItem("cart")
}

const applyDiscount = () => {
 if (discountCode.value === "VIP25") {
  discountApplied.value = true
  discountMessage.value = "Rabattkod använd!"
 } else {
  discountMessage.value = "Fel rabattkod."
 }
}

</script>


<template>
<main>
      <div class="text-main">
        <h2>KASSAN</h2>

        <section v-if="cart.length === 0">
          <p>Din varukorg är tom.</p>
        </section>

        <section v-else class="cart-list">

          <article v-for="item in cartWithProducts" :key="item.id + item.size">

            <img :src="item.product?.imageUrl" width="100"/>

            <div>
              <h3>{{ item.product?.description }}</h3>
              <p>Pris: {{ item.product?.price }}</p>
              <p>Storlek: {{ item.size }}</p>

              <div class="quantity-buttons">
                <button @click="decreaseQuantity (item)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity (item)">+</button>
              </div>
            </div>

          </article>
        </section>

        <section v-if="isLoggedIn">
          <p> Som inloggad kund for du använda rabattkod! Använd "VIP25"</p>
          <input v-model="discountCode" type="text" placeholder="Skriv rabattkod här"/>
          <button @click="applyDiscount">Använd kod</button>
          <p>{{ discountMessage }}</p>
        </section>

        <section>
          <p>Varor: {{ totalProductPrice }} kr</p>
          <p>Frakt: {{ shippingCost }} kr</p>
          <p>Att betala: {{ totalPrice }} kr</p>
        </section>

        <button class="btn" @click="emptyCart">
          Töm Varukorgen
        </button>

        <button class="btn">
          Gå vidare till betalningen
        </button>
      </div>
    </main>

</template>


<style scoped>

.btn {
  background-color: #0077CC;
  color: white;
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  transition: .3s ease;
  display: inline-block;
  width: 300px;
  margin-top: 10px;
  height: 50px;
}


</style>
