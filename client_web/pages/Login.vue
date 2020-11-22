<template>
  <v-container id="login" fluid fill-height>
    <v-row justify="center" align="center">
      <dynamic-form
        :config="config"
        @update:config="config = $event"
        @validate="login()"
      />
    </v-row>
  </v-container>
</template>

<script>
import DynamicForm from '@/components/forms/Form.vue'
export default {
  name: 'Login',
  auth: 'guest',

  components: {
    DynamicForm,
  },

  data: () => ({
    config: {
      title: 'Login to your account',
      validate: 'Login',
      message: {
        type: null,
        text: null,
        duration: 5000,
      },
      width: 4,
      icon: 'mdi-account-circle',
      components: [
        {
          model: null,
          modelName: 'email',
          name: 'inputs-text-field',
          directive: 'config',
          options: {
            dark: false,
            light: true,
            filled: true,
            dense: false,
            shaped: true,
            outlined: true,
            clearable: true,
            autocomplete: false,
            required: true,
            label: 'Email',
            counter: 0,
            rules: [
              (v) => !!v || 'Email required',
              (v) => /.+@.+\.+./.test(v) || 'Invalid Email address',
              (v) =>
                (v && v.length > 4) ||
                'Email must be superior than 4 characters',
            ],
          },
        },
        {
          model: null,
          modelName: 'password',
          name: 'inputs-text-field',
          directive: 'config',
          options: {
            dark: false,
            light: true,
            filled: true,
            dense: false,
            shaped: true,
            outlined: true,
            clearable: true,
            autocomplete: false,
            required: true,
            type: 'password',
            label: 'Password',
            counter: 0,
            rules: [
              (v) => !!v || 'Password required',
              (v) =>
                (v && v.length > 2) ||
                'Password must be superior than 2 characters',
            ],
          },
        },
        {
          model: false,
          modelName: 'googleLoginButton',
          name: 'actions-button',
          directive: 'config',
          options: {
            label: 'Login with Google',
            block: true,
            xlarge: true,
            dark: true,
            shaped: true,
          },
        },
      ],
    },
  }),

  computed: {
    getButtonStateGoogle() {
      return this.config.components[2].model
    },
  },

  watch: {
    'config.message.text'(after) {
      if (after !== null) {
        setTimeout(() => {
          this.config.message.text = null
        }, 5000)
      }
    },
    getButtonStateGoogle: {
      handler(after, before) {
        if (after) {
          this.loginGoogle()
          this.config.components[2].model = before
        }
      },
      deep: true,
    },
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.getModel('email'),
            password: this.getModel('password'),
          },
        })
        this.config.message.type = 'success'
        this.config.message.text = 'Successfully connected'
        this.$router.push({ path: '/dashboard' })
      } catch (err) {
        this.config.message.type = 'error'
        this.config.message.text =
          typeof err.response !== 'undefined' ? err.response.data.message : err
      }
    },

    async loginGoogle() {
      try {
        await this.$auth.loginWith('google')
        this.config.message.type = 'success'
        this.config.message.text = 'Redirecting to Google'
      } catch (err) {
        this.config.message.type = 'error'
        this.config.message.text = err
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

<style scoped>
#login {
}
</style>
