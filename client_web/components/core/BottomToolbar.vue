<template>
  <v-bottom-navigation app>
    <v-btn
      v-for="(item, index) in publicPaths"
      :key="index"
      :to="localePath(item.name)"
    >
      <span>{{ $t('views.' + item.name) }}</span>
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
    isAuthenticated() {
      return this.$auth.loggedIn
    },

    publicPaths() {
      return Paths.filter(
        (path) =>
          path.reduce &&
          (!this.isAuthenticated ? path.public : path.group === 'top')
      )
    },
  },
}
</script>

<style scoped></style>
