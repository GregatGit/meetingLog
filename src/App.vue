<template>
  <div id="app">
    <Navigation :user="user" @logout="logout" />
    <router-view
      class="container"
      :user="user"
      :meetings="meetings"
      :error="error"
      @logout="logout"
      @addMeeting="addMeeting"
      @deleteMeeting="deleteMeeting"
      @checkIn="checkIn"
    />
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
      meetings: [],
      error: null,
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
    addMeeting: function(payload) {
      db.collection('users')
        .doc(this.user.uid)
        .collection('meetings')
        .add({
          name: payload,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
        })
    },
    deleteMeeting: function(payload) {
      db.collection('users')
        .doc(this.user.uid)
        .collection('meetings')
        .doc(payload)
        .delete()
    },
    checkIn: function(payload) {
      db.collection('users')
        .doc(payload.userID)
        .collection('meetings')
        .doc(payload.meetingID)
        .get()
        .then(doc => {
          if (doc.exists) {
            db.collection('users')
              .doc(payload.userID)
              .collection('meetings')
              .doc(payload.meetingID)
              .collection('attendees')
              .add({
                displayName: payload.displayName,
                eMail: payload.eMail,
                createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => this.$router.push('/'))
          } else {
            this.error = 'Sorry, no such meeting'
          }
        })
    },
  },
  mounted() {
    db // call the db
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user

        db.collection('users')
          .doc(this.user.uid)
          .collection('meetings')
          .onSnapshot(snapshot => {
            const snapMeetings = []
            snapshot.forEach(doc => {
              snapMeetings.push({
                id: doc.id,
                name: doc.data().name,
              })
            })
            this.meetings = snapMeetings.sort((a, b) => {
              return a.name.toLowerCase() > b.name.toLowerCase()
            })
          })
      }
    })
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
