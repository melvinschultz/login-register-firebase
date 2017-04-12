<template>
  <div class="register">
    <img src="../../../assets/logo.png" alt="logo">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="errors" v-for="error in errors">
            <p class="red-text center">{{ error }}</p>
          </div>

          <div class="input-field col s10 offset-s1">
            <label for="username">Pseudo</label>
            <input id="username" type="text" class="validate" v-model.trim="username">
          </div>

          <div class="input-field col s10 offset-s1">
            <label for="email">Email</label>
            <input id="email" type="email" class="validate" v-model.trim="email">
          </div>

          <div class="input-field col s10 offset-s1">
            <label for="password">Password</label>
            <input id="password" type="password" class="validate" v-model.trim="password">
          </div>

          <div class="input-field col s10 offset-s1">
            <label for="password_confirmation">Password confirmation</label>
            <input id="password_confirmation" type="password" class="validate" v-model.trim="password_confirmation">
          </div>
        </div>
      </form>
    </div>
    <div class="row">
      <button @click.prevent="register" class="btn waves-effect waves-light" name="action">S'inscrire</button>
    </div>
    <div class="row">
      <router-link to="login">Déjà inscrit ? Se connecter</router-link>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5'
  import firebase from 'firebase'

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: [],
        usersRef: firebase.database().ref('users')
      }
    },
    methods: {
      register () {
        this.errors = []
        if (this.isFormValid()) {
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
            user.updateProfile({
              displayName: this.username,
              photoURL: 'http://www.gravatar.com/avatar/' + md5(user.email) + '?d=identicon'
            }).then(() => {
              // Enregistrement de l'utilisateur en bdd
              this.saveUserToUsersRef(user).then(() => {
                this.$router.push('/login')
              })
            }, error => {
              console.log(error)
              this.errors.push(error.message)
            })
          }).catch(error => {
            console.log(error)
            this.errors.push(error.message)
          })
        }
      },
      saveUserToUsersRef (user) {
        return this.usersRef.child(user.uid).set({
          id: user.uid,
          username: user.displayName,
          avatar: user.photoURL
        })
      },
      isEmpty () {
        if (this.username.length === 0 || this.email.length === 0 || this.password.length === 0 || this.password_confirmation.length === 0) {
          return true
        }
        return false
      },
      passwordValid () {
        if (this.password < 6 || this.password_confirmation < 6) {
          return false
        }
        if (this.password !== this.password_confirmation) {
          return false
        }
        return true
      },
      isFormValid () {
        if (this.isEmpty()) {
          this.errors.push('Veuillez remplir tous les champs')
          return false
        }
        if (!this.passwordValid()) {
          this.errors.push('Passwords incorrects')
          return false
        }
        return true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
