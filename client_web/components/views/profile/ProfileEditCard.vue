<template>
  <v-row justify="center">
    <v-card
      :flat="$vuetify.breakpoint.mdAndDown"
      class="pa-4"
      :color="computedColor"
      :style="width"
    >
      <v-row justify="center" class="my-4">
        <span class="display-1 font-weight-light">{{ title }}</span>
      </v-row>

      <v-row justify="center" align="center" style="height: 256px">
        <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 10">
          <dynamic-raw-form
            :config="config"
            :trigger-validate="triggerValidate"
            :trigger-reset="triggerValidate"
            :reset="triggerReset"
            @update:config="config = $event"
            @validate="test($event)"
          />
        </v-col>
      </v-row>

      <v-row justify="center" class="my-3">
        <v-btn
          width="180"
          color="success"
          outlined
          :loading="triggerValidate"
          :disabled="triggerValidate"
          @click="triggerValidate = true"
        >
          {{ 'Update profile ' }}</v-btn
        >
      </v-row>

      <v-row justify="center" class="my-4">
        <v-btn width="180" color="red" outlined @click="$emit('clickButton')">{{
          buttonText
        }}</v-btn>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'ProfileFormCard',

  components: {
    DynamicRawForm: () => import('~/components/forms/RawForm.vue'),
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#424242',
    },
    secondaryColor: {
      type: String,
      default: '#A0A0A0',
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    usernameValue: null,
    emailValue: null,
    passwordValue: null,
    triggerValidate: false,
    triggerReset: false,
    config: {
      message: {
        type: null,
        text: null,
        duration: 5000,
      },
      components: [
        {
          model: null,
          modelName: 'username',
          name: 'inputs-text-field',
          directive: 'config',
          options: {
            dark: false,
            light: false,
            filled: true,
            dense: false,
            shaped: true,
            outlined: true,
            clearable: true,
            autocomplete: false,
            required: false,
            label: 'register.label-username',
            placeholder: 'username',
            color: 'white',
            counter: 0,
          },
        },
        {
          model: null,
          modelName: 'email',
          name: 'inputs-text-field',
          directive: 'config',
          options: {
            dark: false,
            light: false,
            filled: true,
            dense: false,
            shaped: true,
            outlined: true,
            clearable: true,
            autocomplete: false,
            required: false,
            label: 'login.label-email',
            placeholder: 'email',
            color: 'white',
          },
        },
        {
          model: null,
          modelName: 'password',
          name: 'inputs-text-field',
          directive: 'config',
          options: {
            dark: false,
            light: false,
            filled: true,
            dense: false,
            shaped: true,
            outlined: true,
            clearable: true,
            autocomplete: false,
            required: false,
            type: 'password',
            label: 'login.label-password',
            placeholder: 'password',
            color: 'white',
            counter: 0,
          },
        },
      ],
    },
  }),

  computed: {
    username: {
      get() {
        return this.$store.state.auth.user.username
      },
      set(val) {
        this.config.components[0].options.placeholder = val
      },
    },

    email: {
      get() {
        return this.$store.state.auth.user.email
      },
      set(val) {
        this.config.components[1].options.placeholder = val
      },
    },

    password: {
      get() {
        return this.$store.state.auth.user.password
      },
      set(val) {
        this.config.components[2].options.placeholder = '*'.repeat(val.length)
      },
    },

    width() {
      return this.$vuetify.breakpoint.mdAndUp ? 'width: 95%;' : 'width: 100%;'
    },

    computedColor() {
      return this.$vuetify.breakpoint.mdAndDown
        ? this.index % 2 === 0
          ? this.color
          : this.secondaryColor
        : this.color
    },
  },

  mounted() {
    this.email = this.$store.state.auth.user.email
    this.username = this.$store.state.auth.user.username
    this.password = this.$store.state.auth.user.password
  },

  methods: {
    test(valid) {
      const username = this.getModel('username')
      const email = this.getModel('email')
      const password = this.getModel('password')
      this.updateUser()
      setTimeout(() => {
        this.triggerValidate = false
        this.triggerReset = true
        this.username = !!username
          ? username
          : this.$store.state.auth.user.username
        this.email = !!email ? email : this.$store.state.auth.user.email
        this.password = !!password
          ? password
          : this.$store.state.auth.user.password
      }, 500)
    },

    async updateUser() {
      try {
        await this.$axios.put(
          '/users/profile',
          {
            username: this.getModel('username'),
            email: this.getModel('email'),
            password: this.getModel('password'),
          },
          {
            headers: {
              Authorization: `${this.$auth.getToken('local')}`,
            },
          }
        )
        await this.$auth.fetchUser()
        this.triggerReset = false
      } catch (err) {
        console.error(err)
      }
    },

    getModel(name) {
      const id = this.config.components.findIndex(
        (item) => item.modelName === name
      )
      return this.config.components[id].model
    },
  },
}
</script>
