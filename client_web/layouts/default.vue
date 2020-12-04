<template>
  <v-app dark>
    <client-only>
      <core-toolbar v-if="toolbar" />
      <core-drawer v-if="desktop" />
      <core-bottom-toolbar v-else />
      <core-view />
    </client-only>
  </v-app>
</template>

<script>
export default {
  components: {
    CoreBottomToolbar: () => import('~/components/core/BottomToolbar.vue'),
    CoreToolbar: () => import('~/components/core/Toolbar.vue'),
    CoreDrawer: () => import('~/components/core/Drawer.vue'),
    CoreView: () => import('~/components/core/View.vue'),
  },
  data: () => ({}),

  computed: {
    desktop() {
      return this.$vuetify.breakpoint.mdAndUp
    },

    toolbar() {
      return this.$store.state.app.toolbar
    },
  },
}
</script>
