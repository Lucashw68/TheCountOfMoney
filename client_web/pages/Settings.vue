<template>
  <v-container id="settings" fluid fill-height>
    <v-row justify="center" align="center">
      <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12 : 6">
        <v-row justify="center" align="center">
          <v-col cols="auto">
            <v-btn fab outlined @click="page--">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <span
              class="text-center font-weight-light"
              :class="$vuetify.breakpoint.smAndDown ? 'text-h5' : 'display-2'"
            >
              {{ pages[page].title }}
            </span>
          </v-col>
          <v-col cols="auto">
            <v-btn fab outlined @click="page++">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <component
            :is="component.name"
            v-for="(component, id) in pages"
            v-show="page === id"
            :key="id"
          >
          </component>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Settings',
  transition: 'intro',
  layout: 'default',
  auth: false,

  components: {
    DisplaySettings: () => import('~/components/views/settings/Display.vue'),
    LanguageSettings: () => import('~/components/views/settings/Language.vue'),
  },

  data: () => ({
    page: 0,
    pages: [
      { title: 'DISPLAY', name: 'display-settings' },
      { title: 'LANGUAGE', name: 'language-settings' },
    ],
  }),

  watch: {
    page: {
      handler(val) {
        if (val === this.pages.length) {
          this.page = 0
        } else if (val < 0) {
          this.page = this.pages.length - 1
        }
      },
    },
  },

  mounted() {
    setTimeout(() => {
      console.log('transition')
    }, 2000)
  },
}
</script>

<style scoped>
#settings {
  height: 100%;
}
</style>
