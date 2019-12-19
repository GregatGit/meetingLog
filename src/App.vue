<template>
  <div id="app">
    <Navigation :user="user" @logout="logout" />
    <router-view class="container" :user="user" @logout="logout" />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Firebase from 'firebase'
import db from './db'

export default {
  name: 'app',
  data: function() {
    return {
      user: null,
    }
  },
  methods: {
    logout: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.user = null
          this.$router.push('login')
        })
    },
  },
  mounted() {
    db // call the db
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //eslint-disable-next-line no-console
        console.log(user)
        this.user = user.displayName
      }
    })
    // db.collection('users')
    //   .doc('ZFxZB0JF6iuglSM72uIy')
    //   .get()
    //   .then(snapshot => {
    //     this.user = snapshot.data().name
    //   })
  },
  components: {
    Navigation,
  },
}
</script>

<style lang="scss">
$primary: #05b2dd;
@import 'node_modules/bootstrap/scss/bootstrap';
</style>
