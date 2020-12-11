<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen transition="fab-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="display-1 font-weight-light">{{
            title
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              {{ $t('dialog.close') }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <slot name="content" class="slot" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'Dialog',

  props: {
    active: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },

  data: () => ({}),

  computed: {
    dialog: {
      get() {
        return this.active
      },
      set(val) {
        this.$emit('update:active', val)
      },
    },
  },
}
</script>

<style scoped>
.v-card > .v-card__progress + :not(.v-btn):not(.v-chip),
.v-card > :first-child:not(.v-btn):not(.v-chip) {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
</style>
