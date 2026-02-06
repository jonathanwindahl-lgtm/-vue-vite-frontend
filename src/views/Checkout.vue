<script setup>


</script>


<template>
<main>
      <div class="text-main">
        <h2>KASSAN</h2>

        <form action="/checkout" method="post">
          <fieldset class="field">

            <div id="cartItems"></div>

            <div id="discount-section" style="display:none;">
              <p>Som inloggad kund får du använda rabattkod! Använd "VIP25"</p>
              <input type="text" id="discountInput" placeholder="Skriv rabattkod här">
              <button id="discountBtn" type="button">Använd kod</button>
              <p id="discountMessage"></p>
            </div>


            <div id="checkout-page">
              <p id="totalCost"></p>
              <p id="shippingCost"></p>
              <p id="totalPrice"></p>
            </div>

            <button class="btn" id="emptyCart" type="button">Töm varukorgen</button>
            <div id="shippingInfo"></div>
            <button class="btn" type="button">Gå vidare till betalningen</button>

          </fieldset>
        </form>
      </div>
    </main>


</template>


<style scoped>




</style>
