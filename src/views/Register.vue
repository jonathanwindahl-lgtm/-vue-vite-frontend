<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const email = ref("")
const password = ref("")
const emailError = ref("")
const passwordError = ref("")
const message = ref("")

const validEmail = (email) => /^\S+@\S+\.\S+$/.test(email)
const validPassword = (pwd) => /^[A-Za-z0-9]{8,}$/.test(pwd)

function createAccount() {
  let valid = true

  if (!email.value) {
    emailError.value = "Ange en mejladress"
    valid = false
  } else if (!validEmail(email.value)) {
    emailError.value = "Ange en giltlig mejladress"
    valid = false
  } else {
    emailError.value = ""
  }

  if (!validPassword(password.value)) {
    passwordError.value = "Lösenordet måste vara minst 8 tecken"
    valid = false
  } else {
    passwordError.value = ""
  }

  if (!valid) return

  message.value = "Konto skapat"

  const user = { email: email.value, password: password.value }
  localStorage.setItem("user", JSON.stringify(user))

  setTimeout(() => {
    router.push("/login")
  }, 3000)
}
</script>

<template>
  <header>
    <RouterLink to="/"><h1>Springskor</h1></RouterLink>
  </header>
  <main>
    <article>
      <section class="login">
        <h2>Skapa konto</h2>
        <form onsubmit="return false">
          <label for="email">Email</label>
          <input class="info" v-model="email" type="email" placeholder="Mejl" />
          <p v-if="emailError" class="error">{{ emailError }}</p>

          <label for="psw">Lösenord</label>
          <input class="info" v-model="password" type="password" placeholder="Lösenord" />
          <p v-if="passwordError" class="error">{{ passwordError }}</p>

          <button @click="createAccount">Skapa konto</button>

          <p v-if="message" class="success">{{ message }}</p>
        </form>
        <aside>
          <RouterLink to="/login"><p>Tillbaka till inloggningen</p></RouterLink>
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
  color: #0077cc;
  text-align: center;
}

h2 {
  text-align: center;
}

a {
  color: #0077cc;
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
  background-color: #0077cc;
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
  background-color: #005fa3;
}

p {
  text-align: center;
  margin: 0.5em 0;
}

.error {
  color: red;
}

.success {
  color: green;
}

@media screen and (max-width: 768px) {
  .login {
    max-width: 300px;
  }
}
</style>
