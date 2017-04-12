# login-register-firebase

> Connexion "module" (Vue.js + Firebase)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## How it's work ?

You just have to do the build setup as above and change value of the below keys in main.js file :

```bash
// Initialize Firebase
let config = {
  apiKey: 'firebase-api-key', // change this with your real firebase apiKey
  authDomain: 'firebase-auth-domain', // change this with your real firebase authDomain
  databaseURL: 'firebase-database_url', // change this with your real firebase databaseURL
  storageBucket: 'firebase-storage-bucket', // change this with your real firebase storageBucket
  messagingSenderId: 'firebase-messaging-sender-id' // change this with your real firebase messagingSenderId
}
```
