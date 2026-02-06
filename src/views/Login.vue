<script setup>
import {ref} from "vue"
import {useRouter} from "vue-router"

const router = useRouter()

const email = ref("")
const password = ref("")
const message = ref("")
const messageColor = ref("")

function login() {

  const user = JSON.parse(localStorage.getItem("user"))


  if (!user) {
    message.value = "Inget konto hittades!"
    messageColor.value = "red"
    return
  }

  const correct = email.value === user.email && password.value === user.password

  if (correct) {
    localStorage.setItem("isLoggedIn", true)

    message.value = "Inloggning lyckades!"
    messageColor.value = "green"

    setTimeout(() => {
      router.push('/')
    }, 3000)
  } else {
    message.value= "Fel användarnamn eller lösenord!"
     messageColor.value = "red"
  }
}


</script>

<template>


   <header>
    <RouterLink to="/"><h1>Springskor</h1></RouterLink>
  </header>
  <main>
    <article>
      <section class="login">
        <h2>Logga in</h2>
        <form @submit.prevent="login">
          <label for="email">Email</label>
          <input class="info" type="email" v-model="email" placeholder="Ange mejladress" required>

          <label for="psw">Lösenord</label>
          <input class="info" type="password" v-model="password" placeholder="Ange lösenord" required>


          <button type="submit">Logga in</button>
          <p :style="{color: messageColor}">{{ message }}</p>
        </form>
        <aside>
          <RouterLink to="register"><p>Skapa konto</p></RouterLink>
        </aside>
      </section>
    </article>
  </main>

</template>

<style scoped>

.login {
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 1);
}

h1 {
  color: #0077CC;
  text-align: center;
}

h2 {
  text-align: center;
}

a {
  color: #0077CC;
  text-decoration: none;
  display: block;
  text-align: center;
  margin: 20px 0;
}

a:hover,
a:focus {
  text-decoration: underline;
}

.info {
  margin-bottom: 10px;
  width: 100%;
  padding: 0.5em;
}

button {
  background-color: #0077CC;
  color: white;
  width: 100%;
  padding: 1em 1em;
  border-radius: 10px;
  margin: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #005FA3;
}

p {
  text-align: center;
  margin: 0.5em 0;
}

@media screen and (max-width: 768px) {
  .login {
    max-width: 300px;
  }
}


</style>
