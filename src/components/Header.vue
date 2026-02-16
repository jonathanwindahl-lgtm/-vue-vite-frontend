<script setup>
import SearchBar from '../components/SearchBar.vue';

const props = defineProps ({
  modelValue: String,
  cartCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>

<header>
<div class="top">
        <p>1-4 arbetsdagars leveranstid</p>
        <p>Fri frakt & retur till butik</p>
        <p>Öppet köp i 365 dagar</p>
    </div>
    <div class="header-bar">
    <RouterLink to="/"><h1>Springskor</h1></RouterLink>

    <SearchBar :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)"/>

    <nav class="user-nav">
    <RouterLink to="login"><p>Logga in</p></RouterLink>
    <span id="cart-count">{{ cartCount }}</span>

          <RouterLink to="/checkout">
          <img src="/kassa.jpg" id="cart-icon"  alt="Till kassan">
        </RouterLink>
        </nav>
    </div>
<div class="divider"></div>
</header>
</template>

<style scoped>

.top {
  display: flex;
  background-color: #0077CC;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 0.8rem;
}

.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0px 30px 0px;

}

a {
  color: #0077CC;
  text-decoration: none;
  font-weight: bold;
}

.divider {
  background-color: #0077CC;
  height: 5px;
  margin: 5px 0 10px;
}

#cart-icon {
  width: 30px;
}

#cart-count {
  color: red;
  font-weight: bold;
  margin: 5px;
}

.user-nav {
  display: flex;
  align-items: center;
}

p {
  margin-bottom: 0;
}

@media screen and (max-width: 768px) {

  .top {
    font-size: 0.7rem;
  }
  .header-bar {
    flex-direction: column;
    align-items: baseline;
  }
}


</style>
