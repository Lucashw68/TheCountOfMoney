<template>
  <v-container id="home" fluid fill-height>
    <v-row justify="center">
      <v-container fluid fill-height>
        <v-row justify="center" align="center" class="mb-8">
          <v-avatar id="logo" :size="$vuetify.breakpoint.mdAndUp ? 320 : 128">
            <v-img :src="require('~/static/logo.png')" />
          </v-avatar>
        </v-row>

        <v-row justify="center" align="center">
          <span
            class="text-center font-weight-light mb-4 big-title"
            :class="$vuetify.breakpoint.mdAndUp ? 'text-h3' : 'text-h4'"
            style="color: #424242"
          >
            Keep informed and beat the coins
          </span>
        </v-row>

        <v-row
          v-if="$vuetify.breakpoint.mdAndUp"
          justify="center"
          align="center"
        >
          <p
            class="mx-auto text text-center font-weight-light"
            style="max-width: 568px; color: #424242"
          >
            TheCountOfMoney is a web platform to follow in realtime the price of
            your favorites cryptocurrencies and the stay tuned with their news.
          </p>
        </v-row>

        <v-row justify="center" align="center">
          <v-container fluid fill-height>
            <v-row justify="center" align="center">
              <v-col cols="auto">
                <v-btn
                  class="font-weight-light"
                  :x-large="$vuetify.breakpoint.mdAndUp"
                  :large="$vuetify.breakpoint.mdAndDown"
                  router
                  depressed
                  width="220"
                  color="#419CF3"
                >
                  <v-icon left class="mr-4">mdi-star-three-points</v-icon>
                  Get Started
                </v-btn>
              </v-col>

              <v-col cols="auto">
                <v-btn
                  class="font-weight-light"
                  :x-large="$vuetify.breakpoint.mdAndUp"
                  :large="$vuetify.breakpoint.mdAndDown"
                  :to="isAuthenticated ? '/profile' : '/login'"
                  router
                  depressed
                  width="220"
                  color="#424242"
                  outlined
                >
                  <v-icon left class="mr-4">mdi-account-circle</v-icon>
                  {{ isAuthenticated ? 'Profile' : 'Login' }}
                </v-btn>
              </v-col>

              <v-col cols="auto">
                <v-btn
                  class="font-weight-light"
                  :x-large="$vuetify.breakpoint.mdAndUp"
                  :large="$vuetify.breakpoint.mdAndDown"
                  to="/about"
                  router
                  depressed
                  width="220"
                  color="#424242"
                >
                  <v-icon left class="mr-4">mdi-file-document</v-icon>
                  Documentation
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  auth: false,

  data: () => ({}),

  computed: {
    isAuthenticated() {
      return this.$store.state.auth.loggedIn
    },
  },
}
</script>

<style scoped>
#home {
}

.big-title {
  color: rgba(255, 255, 255, 0.3);
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5),
    0 0 10px rgba(255, 255, 255, 0.5), 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;
}

.text {
  font-size: 1.25rem;
}
</style>
