<template>
  <v-app-bar
    dark
    color="primary"
    app
    style="box-shadow: 0px 0px 35px 6px #121212"
  >
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mdAndUp"
      @click.stop="toggleDrawer"
    />

    <v-toolbar-title class="font-weight-light headline" v-text="title" />

    <v-spacer />

    <v-btn
      v-if="isAuthenticated && $vuetify.breakpoint.mdAndUp"
      to="/profile"
      class="mx-4"
      outlined
      text
    >
      <v-row justify="end" align="center">
        <v-avatar class="mx-2">
          <v-img
            style="background-color: white"
            class="avatar"
            lazy-src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
            :src="
              this.$store.state.auth.user.provider === 'local'
                ? `https://avatars.dicebear.com/v2/male/${loggedInUser.email}.svg`
                : loggedInUser[`${this.$store.state.auth.user.provider}`].avatar
            "
          />
        </v-avatar>
        <span class="text-center font-weight-light headline mx-4">
          {{ loggedInUser.username || loggedInUser.email || '- - -' }}
        </span>
      </v-row>
    </v-btn>

    <v-btn
      v-if="isAuthenticated"
      outlined
      text
      class="text-center font-weight-light headline"
      @click.stop="logout()"
    >
      Logout
    </v-btn>

    <v-btn
      v-else
      text
      outlined
      x-large
      exact
      active-class="active"
      to="/login"
      class="text-center font-weight-light headline"
    >
      Login
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CoreToolbar',

  data: () => ({}),

  computed: {
    ...mapState('app', ['mini', 'drawer']),

    title() {
      return this.$nuxt.$route.name
    },

    isAuthenticated() {
      return this.$store.state.auth.loggedIn
    },

    loggedInUser() {
      return this.$store.state.auth.user
    },
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'setMini']),

    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push({ path: '/home' })
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

<style scoped>
.active {
  background-color: cyan;
  background-color: rgba(0, 255, 255, 0.5);
}
.avatar {
  border: 4px solid white;
}
</style>
