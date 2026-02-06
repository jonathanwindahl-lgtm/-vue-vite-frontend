<script setup>

 const props = defineProps ({

  modelValue:String
 })

 const emit = defineEmits(["update:modelValue"])

 const updateValue = (event) => {

  emit("update:modelValue", event.target.value)
 }
 </script>

<template>
<input type="search" class="search-bar" :value="props.modelValue" @input="updateValue" placeholder="Sök efter produkter" />

</template>

<style scoped>
input {
  background-color: lightgray;
  border-radius: 8px;
  border: none;
  width: 300px;
  padding: 10px;
}


</style>
