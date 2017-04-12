// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Materials from 'vue-material'
import store from './store'

Vue.use(VueResource)
Vue.use(Materials)

Vue.config.productionTip = false
Vue.config.devtools = true

// Initialize Firebase
let config = {
  apiKey: 'firebase-api-key', // change this with real apiKey
  authDomain: 'firebase-auth-domain', // change this with real authDomain
  databaseURL: 'firebase-database_url', // change this with real databaseURL
  storageBucket: 'firebase-storage-bucket', // change this with real storageBucket
  messagingSenderId: 'firebase-messaging-sender-id' // change this with real messagingSenderId
}
firebase.initializeApp(config)

const unsuscribe = firebase.auth().onAuthStateChanged(user => {
  store.dispatch('setUser', user)

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })

  unsuscribe()
})
