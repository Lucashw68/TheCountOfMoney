<template>
  <v-text-field
    v-model="model"
    :shaped="config.shaped || false"
    :filled="config.filled || false"
    :dark="config.dark || false"
    :light="config.light || false"
    :dense="config.dense || false"
    :clearable="config.clearable || false"
    :outlined="config.outlined || true"
    :autocomplete="config.autocomplete || false"
    :required="config.required || false"
    :counter="config.counter || 0"
    :label="config.label || '...'"
    :type="config.type || 'text'"
    :rules="config.rules"
  ></v-text-field>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TextField',

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
    modelProps: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    modelValue: null,
    responsive: false,
  }),

  computed: {
    ...mapState('app', ['background', 'color']),

    model: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.modelValue = val
        this.$emit('model', val)
      },
    },
  },

  mounted() {
    if (this.modelProps !== null && this.modelProps !== '') {
      this.modelValue = this.modelProps
    }
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

<style lang="scss"></style>
