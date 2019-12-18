import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Meeting from '../views/Meeting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/meeting',
    name: 'meeting',
    component: Meeting,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
})

export default router
