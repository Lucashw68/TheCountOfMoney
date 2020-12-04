<template>
  <v-container id="display-settings" fluid fill-height>
    <v-row justify="center" align="center" class="pt-4">
      <v-card color="#424242" min-height="400" style="width: 100%">
        <v-container fluid fill-height>
          <v-row justify="center" align="center">
            <v-col
              v-if="$vuetify.breakpoint.mdAndUp"
              :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12"
            >
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <v-row justify="center" align="center">
                    <span class="display-1 text-center font-weight-light">
                      Layout
                    </span>
                  </v-row>
                </v-col>
              </v-row>

              <v-row justify="center" align="center" class="py-3">
                <v-btn
                  height="64"
                  width="200"
                  class="mx-4"
                  x-large
                  outlined
                  :color="drawer ? 'success' : 'white'"
                  @click.stop="toggleDrawer"
                >
                  {{ drawer ? 'Hide Drawer' : 'Display drawer' }}
                </v-btn>
              </v-row>

              <v-row justify="center" align="center" class="py-3">
                <v-btn
                  height="64"
                  width="200"
                  class="mx-4"
                  x-large
                  outlined
                  depressed
                  color="white"
                  @click.stop="toggleMini"
                >
                  <v-icon>{{
                    mini ? 'mdi-arrow-right' : 'mdi-arrow-left'
                  }}</v-icon>
                  Drawer
                </v-btn>
              </v-row>

              <v-row justify="center" align="center" class="py-3">
                <v-btn
                  height="64"
                  width="200"
                  class="mx-4"
                  x-large
                  outlined
                  depressed
                  color="white"
                  @click.stop="toggleToolbar"
                >
                  <v-icon>{{
                    toolbar ? 'mdi-arrow-up' : 'mdi-arrow-down'
                  }}</v-icon>
                  Toolbar
                </v-btn>
              </v-row>
            </v-col>

            <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <v-row justify="center" align="center">
                    <span class="display-1 text-center font-weight-light"
                      >Background</span
                    >
                  </v-row>
                </v-col>
                <v-col
                  v-for="(item, id) in backgrounds"
                  :key="id"
                  :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12"
                >
                  <v-row justify="center" align="center">
                    <v-btn
                      height="64"
                      width="150"
                      x-large
                      outlined
                      depressed
                      :style="
                        hover
                          ? `background: ${item.gradient};border-color: white;color:#424242`
                          : 'background: inherit;'
                      "
                      @mouseover="hover = true"
                      @mouseleave="hover = false"
                      @click.stop="setGradient(item.gradient)"
                    >
                      {{ item.name }}
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DisplaySettings',

  data: () => ({
    hover: false,
    backgrounds: [
      {
        name: 'Default',
        gradient:
          'linear-gradient(270deg, #74ebd5, #b8bfdb, #39c2d8) no-repeat;',
      },
      {
        name: 'Blue',
        gradient:
          'linear-gradient(270deg, #020024, #090979, #00d4ff) no-repeat;',
      },
      {
        name: 'Burst',
        gradient:
          'linear-gradient(270deg, #833ab4, #fd1d1d, #fcb045) no-repeat;',
      },
      {
        name: 'Radial',
        gradient:
          'radial-gradient(circle, rgba(195,167,179,1) 0%, rgba(148,187,233,1) 100%);',
      },
      {
        name: 'Light',
        gradient: '#ffebcf',
      },
      {
        name: 'Dark',
        gradient:
          'linear-gradient(270deg, #080808, #181818, #282828) no-repeat;',
      },
    ],
  }),

  computed: {
    ...mapState('app', ['mini', 'drawer', 'toolbar']),
  },

  methods: {
    ...mapMutations('app', [
      'setDrawer',
      'setMini',
      'setToolbar',
      'setGradient',
    ]),

    toggleDrawer() {
      this.setDrawer(!this.$store.state.app.drawer)
    },

    toggleToolbar() {
      this.setToolbar(!this.$store.state.app.toolbar)
    },

    toggleMini() {
      this.setMini(!this.$store.state.app.mini)
    },
  },
}
</script>

<style scoped></style>
