import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from './router'
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(createBootstrap())
app.mount('#app')


/* createApp(App).use(router).use(pinia).mount("#app");
 */
