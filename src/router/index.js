import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Home from '../components/pages/Home'
import Login from '../components/pages/auth/Login'
import Register from '../components/pages/auth/Register'
import firebase from 'firebase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
