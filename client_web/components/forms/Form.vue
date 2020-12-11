<template>
  <v-container fluid>
    <v-row v-if="config.image && config.image.length !== 0" justify="center">
      <v-avatar size="100">
        <v-img :src="config.image" />
      </v-avatar>
    </v-row>
    <v-row align="center" align-content="center" justify="center" class="mt-2">
      <v-col :cols="responsive ? 12 : config.width || 4">
        <v-card id="form-title" :color="color">
          <v-card-title id="title"
            ><v-icon class="pr-4" dark large>{{ config.icon }}</v-icon
            >{{ $t(config.title) | capitalize }}</v-card-title
          >
        </v-card>

        <transition name="slide-fade">
          <v-card
            v-if="config.message.text && config.message.text !== null"
            id="form-message"
            :color="config.message.type"
            flat
          >
            <v-card-title id="form-message-text" class="justify-center">
              {{ config.message.text | capitalize }}
            </v-card-title>
          </v-card>
        </transition>

        <v-card id="form-content" flat>
          <v-layout row wrap align-center justify-center class="ml-3 mr-3">
            <v-flex xs12 mt-4>
              <v-form ref="form" v-model="valid" lazy-validation>
                <component
                  :is="component.name"
                  v-for="(component, id) in config.components"
                  :key="id"
                  class="mx-2"
                  :model-props="
                    /^actions/.test(component.name) ? null : component.model
                  "
                  :[component.directive]="component.options"
                  @model="updateModel(component, $event)"
                >
                </component>

                <v-layout row wrap align-center>
                  <v-flex xs12 mt-4>
                    <v-btn
                      id="form-button"
                      x-large
                      block
                      dark
                      :color="color"
                      @click="validate()"
                    >
                      <span>{{ $t(config.validate) || 'Validate' }}</span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InputsTextField from '@/components/forms/inputs/TextField.vue'
import InputsTextDate from '@/components/forms/inputs/TextDate.vue'
import InputsTextTime from '@/components/forms/inputs/TextTime.vue'
import ActionsButton from '@/components/forms/actions/Button.vue'
import InputsDate from '@/components/forms/inputs/Date.vue'
import InputsSelect from '@/components/forms/inputs/Select.vue'
import { mapState } from 'vuex'
export default {
  name: 'Form',

  components: {
    InputsTextField,
    InputsTextDate,
    InputsTextTime,
    ActionsButton,
    InputsDate,
    InputsSelect,
    InputSlider: () => import('~/components/forms/inputs/Slider.vue'),
    InputCombobox: () => import('~/components/forms/inputs/Combobox.vue'),
  },

  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },

  props: {
    config: {
      type: Object,
      default: () => {},
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    valid: false,
    responsive: false,
  }),

  computed: {
    ...mapState('app', ['color']),
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

    updateModel(component, model) {
      const id = this.$props.config.components.findIndex(
        (item) => component.modelName === item.modelName
      )
      this.$props.config.components[id].model = model
      this.$emit('update:config', this.$props.config)
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('validate')
      }
    },

    reset() {
      this.$refs.form.reset()
    },

    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style scoped>
#title {
  color: white;
  line-height: 1.5em;
  font-size: 1.5rem;
  font-weight: 350;
}
#form-message-text {
  color: white;
  line-height: 1.5em;
  font-size: 1.5rem;
  font-weight: 350;
}
#form-content {
  background-color: rgba(127, 127, 127, 0.2);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}
#form-title {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 0px;
}
#form-message {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
#form-button {
  font-weight: 350;
  font-size: 20px;
  opacity: 0.9;
  border-radius: 0px 0px 20px 20px;
}
.v-card--link:after {
  display: none !important;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
