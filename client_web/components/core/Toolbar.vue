<template>
  <v-app-bar
    dark
    color="primary"
    app
    style="box-shadow: 0px 0px 35px 6px #121212"
  >
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-btn fab small depressed color="#424242" @click.stop="toggleMini">
      <v-icon>{{ mini ? 'mdi-arrow-right' : 'mdi-arrow-left' }}</v-icon>
    </v-btn>
    <v-toolbar-title class="font-weight-light headline" v-text="title" />

    <v-spacer />

    <span v-if="loggedInUser" class="subtitle">
      {{ loggedInUser }}
    </span>

    <v-btn v-if="isAuthenticated" text x-large @click.stop="logout()">
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CoreToolbar',

  data: () => ({
    title: '',
  }),

  computed: {
    ...mapState('app', ['mini']),

    isAuthenticated() {
      return this.$store.state.auth.loggedIn
    },

    loggedInUser() {
      return this.$store.state.auth.user
    },
  },

  watch: {
    $route(val) {
      this.title = val.name
      if (val.name === 'index') {
        this.title = 'Home'
      } else if (val.name === null) {
        this.title = 'Error'
      }
    },
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'setMini']),

    async logout() {
      try {
        await this.$auth.logout()
      } catch (err) {
        console.log(err)
      }
    },

    toggleDrawer() {
      this.setDrawer(!this.$store.state.app.drawer)
    },

    toggleMini() {
      this.setMini(!this.$store.state.app.mini)
    },
  },
}
</script>

<style scoped></style>
