<template>
  <span>
    <v-combobox
      v-model="model"
      class="px-2"
      hide-details
      :dark="config.dark || false"
      :light="config.light || false"
      :shaped="config.shaped || false"
      :filled="config.filled || false"
      :outlined="config.outlined || false"
      :color="config.color || '#424242'"
      :multiple="config.multiple || false"
      :label="$t(config.label) || ''"
      :dense="config.dense || false"
      :items="config.items || []"
      :small-chips="config.smallchips || false"
      :deletable-chips="config.deletable || false"
    >
    </v-combobox>
  </span>
</template>

<script>
export default {
  name: 'Combobox',

  inheritAttrs: false,

  props: {
    config: {
      type: Object,
      default: () => {},
    },
    modelProps: {
      type: [String, Array],
      default: '',
    },
  },
  data: () => ({
    modelValue: null,
  }),

  computed: {
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
  },
}
</script>

<style scoped></style>
