<template>
  <v-date-picker
    v-model="model"
    locale="fr-fr"
    :color="color"
    :landscape="config.landscape"
    :reactive="config.reactive"
    :full-width="config.fullWidth"
    :show-current="config.showCurrent"
    :type="month ? 'month' : 'date'"
    :multiple="config.multiple"
    :readonly="config.readonly"
    :disabled="config.disabled"
    :events="enableEvents ? functionEvents : null"
  ></v-date-picker>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Date',

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
    modelValue: new Date().toISOString().substr(0, 10),
    responsive: false,

    picker: new Date().toISOString().substr(0, 10),
    month: false,
    enableEvents: false,

    date: new Date().toISOString().substr(0, 10),
    modal: false,
  }),

  computed: {
    ...mapState('app', ['background', 'color']),

    functionEvents() {
      return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
    },

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

    dateFunctionEvents(date) {
      const [, , day] = date.split('-')
      if ([12, 17, 28].includes(parseInt(day, 10))) return true
      if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
      return false
    },

    monthFunctionEvents(date) {
      const month = parseInt(date.split('-')[1], 10)
      if ([1, 3, 7].includes(month)) return true
      if ([2, 5, 12].includes(month))
        return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
      return false
    },
  },
}
</script>

<style lang="scss"></style>
