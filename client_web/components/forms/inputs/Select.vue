<template>
  <span>
    <v-select
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
    >
      <template v-if="config.multiple" v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0">
          <span>{{ item }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text caption">
          (+{{ model.length - 1 }} others)
        </span>
      </template>
    </v-select>
  </span>
</template>

<script>
export default {
  name: 'Select',

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
