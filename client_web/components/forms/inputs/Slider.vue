<template>
  <span>
    <v-row justify="center" align="center">
      <span class="headline text-center font-weight-light">
        {{ $t(config.title) || 'Title' }}
      </span>
    </v-row>

    <v-row justify="center" align="center">
      <v-slider
        v-model="model"
        class="px-2"
        :dark="config.dark || false"
        :light="config.light || false"
        :min="config.min || 0"
        :max="config.max || 10"
        :step="config.step || 1"
        thumb-label="always"
        :color="config.color || '#424242'"
      >
        <template v-slot:prepend>
          <v-icon @click="decrement">
            {{ config.prependicon || 'mdi-minus' }}
          </v-icon>
        </template>

        <template v-slot:append>
          <v-icon @click="increment">
            {{ config.appendicon || 'mdi-plus' }}
          </v-icon>
        </template>
      </v-slider>
    </v-row>
  </span>
</template>

<script>
export default {
  name: 'Slider',

  inheritAttrs: false,

  props: {
    config: {
      type: Object,
      default: () => {},
    },
    modelProps: {
      type: Number,
      default: 1,
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

  methods: {
    decrement() {
      this.model--
    },
    increment() {
      this.model++
    },
  },
}
</script>

<style scoped></style>
