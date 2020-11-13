<template>
  <v-app dark>
    <core-toolbar />
    <core-drawer />
    <core-view />
  </v-app>
</template>

<script>
import CoreDrawer from '@/components/core/Drawer.vue'
import CoreToolbar from '@/components/core/Toolbar.vue'
import CoreView from '@/components/core/View.vue'
export default {
  components: {
    CoreToolbar,
    CoreDrawer,
    CoreView,
  },
  data: () => ({}),
}
</script>
