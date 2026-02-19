import { createRouter, createWebHistory } from "vue-router"
import ShoeGallery from "./views/ShoeGallery.vue"
import ProductDetail from "./views/ProductDetail.vue"
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import Checkout from "./views/Checkout.vue"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: ShoeGallery
    },
    {
      path: "/product/:id",
      name: "product",
      component: ProductDetail,
      props: true
    },
    {
      path: "/login/",
      name: "login",
      component: Login
    },
    {
      path: "/register/",
      name: "register",
      component: Register
    },
    {
      path: "/checkout/",
      name: "checkout",
      component: Checkout
    }
  ]
})
