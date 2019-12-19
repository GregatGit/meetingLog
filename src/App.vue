<template>
  <div id="app">
    <Navigation />
    <router-view class="container" :user="user" />
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
      user: null
    }
  },
  mounted() {
    db // call the db 
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.email
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
    Navigation
  }
}
</script>

<style lang="scss">
  $primary: #05b2dd;
  @import "node_modules/bootstrap/scss/bootstrap"
</style>

