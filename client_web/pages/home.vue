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
            {{ $t('home.title') }}
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
            {{ $t('home.description') }}
          </p>
        </v-row>

        <img
          style="position: absolute; top: 10px; right: 10px"
          alt="GitHub tag (latest by date)"
          src="https://img.shields.io/github/v/tag/Lucashw68/TheCountOfMoney"
        />

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
                  {{ $t('home.buttons.get_started') }}
                </v-btn>
              </v-col>

              <v-col cols="auto">
                <v-btn
                  class="font-weight-light"
                  :x-large="$vuetify.breakpoint.mdAndUp"
                  :large="$vuetify.breakpoint.mdAndDown"
                  :to="
                    isAuthenticated
                      ? localePath('profile')
                      : localePath('login')
                  "
                  router
                  depressed
                  width="220"
                  color="#424242"
                  outlined
                >
                  <v-icon left class="mr-4">mdi-account-circle</v-icon>
                  {{
                    isAuthenticated
                      ? $t('home.buttons.profile')
                      : $t('home.buttons.login')
                  }}
                </v-btn>
              </v-col>

              <v-col cols="auto">
                <v-btn
                  class="font-weight-light"
                  :x-large="$vuetify.breakpoint.mdAndUp"
                  :large="$vuetify.breakpoint.mdAndDown"
                  :to="localePath('about')"
                  router
                  depressed
                  width="220"
                  color="#424242"
                >
                  <v-icon left class="mr-4">mdi-file-document</v-icon>
                  {{ $t('home.buttons.documentation') }}
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
