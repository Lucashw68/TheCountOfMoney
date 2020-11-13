<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="model"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="model"
        :shaped="config.shaped || false"
        :filled="config.filled || false"
        :dark="config.dark || false"
        :light="config.light || false"
        :dense="config.dense || false"
        :outlined="config.outlined || true"
        :label="config.label || 'Picker Date'"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="model" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(model)"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TextDate',

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
    modal: false,
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

  watch: {
    'this.$props.modelProps': {
      deep: true,
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
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
