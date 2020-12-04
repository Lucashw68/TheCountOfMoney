<template>
  <v-bottom-navigation app>
    <v-btn v-for="(item, index) in publicPaths" :key="index" :to="item.path">
      <span>{{ item.name }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import Paths from '@/router/paths.js'
export default {
  name: 'CoreBottomToolbar',

  data: () => ({}),

  computed: {
    title() {
      return this.$nuxt.$route.name
    },

    isAuthenticated() {
      return this.$store.state.auth.loggedIn
    },

    loggedInUser() {
      return this.$store.state.auth.user
    },

    publicPaths() {
      return Paths.filter(
        (path) =>
          path.reduce &&
          (!this.isAuthenticated ? path.public : path.group === 'top')
      )
    },
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push({ path: '/home' })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped></style>
