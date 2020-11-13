<template>
  <span>
    <v-select
      v-model="model"
      :dark="config.dark"
      :shaped="config.shaped"
      :filled="config.filled"
      :label="config.label"
      :dense="config.dense"
      :items="config.items"
      :rules="config.rules"
    >
    </v-select>
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Select',

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
    passRules: [
      (v) => !!v || 'Password required',
      (v) =>
        (v && v.length > 10) || 'Password must be superior than 10 characters',
    ],
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
