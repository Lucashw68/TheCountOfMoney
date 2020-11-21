<template>
  <v-btn
    id="action-button"
    :color="color"
    :block="config.block || false"
    :x-large="config.xlarge || false"
    :dark="config.dark || false"
    :light="config.light || false"
    :dense="config.dense || false"
    :shaped="config.shaped || false"
    @click="model = true"
  >
    <span>{{ config.label | capitalize }}</span>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ActionsButton',

  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      const rvalue = value.replace(/_/g, ' ')
      return rvalue.charAt(0).toUpperCase() + rvalue.slice(1)
    },
  },

  inheritAttrs: false,

  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    responsive: false,
  }),

  computed: {
    ...mapState('app', ['background', 'color']),

    model: {
      get() {
        return false
      },
      set(val) {
        console.log('model set emitted')
        this.$emit('model', val)
      },
    },
  },

  mounted() {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    onResponsiveInverted() {
      if (window.innerWidth < 1450) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
  },
}
</script>

<style scoped>
#action-button {
  margin: 0 !important;
  font-weight: 350;
  font-size: 20px;
  opacity: 0.9;
  border-radius: 20px 20px 0px 0px;
}
</style>
