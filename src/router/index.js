import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Meeting from '../views/Meeting.vue'
import CheckIn from '../views/CheckIn.vue'
import Attendees from '../views/Attendees.vue'

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
    path: '/meetings',
    name: 'meetings',
    component: Meeting,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/checkin/:userID/:meetingID',
    name: 'CheckIn',
    component: CheckIn
  },
  ,
  {
    path: '/attendees/:userID/:meetingID',
    name: 'Attendees',
    component: Attendees
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  routes,
})

export default router
