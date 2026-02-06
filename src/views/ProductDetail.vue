<script>

  export default {
    props: ["id"],

    data() {
      return {
        product: null
      };
    },

    mounted() {
      fetch(`https://6915a1dc84e8bd126afabb7f.mockapi.io/Products/${this.id}`)
      .then(response => response.json())
      .then(data =>

        this.product = data)
  }
}
</script>

<template>

  <RouterLink to="/"> < Tillbaka</RouterLink>


    <div v-if="!product">Laddar Produkt...</div>

    <div v-else class="product-detail">


     <img :src="`/${product.imageUrl}`"  :alt="product.description" />
     <div>
    <h2> {{ product.description}}</h2>
     <h3>{{ product.price }} kr</h3>

     <label for="size">Storlek</label>
            <div>
              <select name="size" id="size" required>
                <option selected disabled value="">Välj storlek</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
              </select>
            </div>
            <p id="sizeError"></p>

              <button class="btn" id="addToCartBtn">Lägg i kundvagn</button>

            <section id="product-info">
              <h3>Produktinformation</h3>
              <ul>
                <li>Lätta och bekväma löparskor</li>
                <li>Andningsbar ovandel i mesh</li>
                <li>Dämpad sula för optimal komfort</li>
                <li>Perfekta för både träning och vardagslöpning</li>
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
  color: #0077CC;
  align-items: center;
}



.product-detail img {
  width: 50%;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
}
a {
  color: #0077CC;
  text-decoration: none;
  font-weight: bold;
}

#product-info {
  margin: 20px;


}

select {
  color: #0077CC;
  padding: 10px;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  width: 200px;
}

.btn {
  background-color: #0077CC;
  color: white;
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  transition: .3s ease;
  display: inline-block;
  width: 200px;
  margin-top: 10px;
}

ul {
    padding: 0;
}

</style>
