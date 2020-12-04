<template>
  <v-container id="register" fluid fill-height>
    <v-row justify="center" align="center">
      <dynamic-form
        :config="config"
        @update:config="config = $event"
        @validate="register()"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Register',
  auth: 'guest',

  components: {
    DynamicForm: () => import('~/components/forms/Form.vue'),
  },

  data: () => ({
    config: {
      title: 'Create your account',
      validate: 'Register',
      message: {
        type: null,
        text: null,
        duration: 5000,
      },
      width: 4,
      icon: 'mdi-account-plus',
      components: [
        {
          model: null,
          modelName: 'username',
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
            label: 'Username',
            counter: 0,
            rules: [
              (v) => !!v || 'Username required',
              (v) =>
                (v && v.length > 4) ||
                'Username must be superior than 4 characters',
            ],
          },
        },
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
                (v && v.length > 7) ||
                'Password must be superior than 7 characters',
            ],
          },
        },
      ],
    },
  }),

  methods: {
    ...mapMutations('app', ['setDrawer']),

    async register() {
      try {
        await this.$axios.post('/users/register', {
          username: this.getModel('username'),
          email: this.getModel('email'),
          password: this.getModel('password'),
        })

        await this.$auth.loginWith('local', {
          data: {
            email: this.getModel('email'),
            password: this.getModel('password'),
          },
        })
        this.config.message.type = 'success'
        this.config.message.text = 'Successfully connected'
        this.$router.push('/')
        this.setDrawer(true)
      } catch (err) {
        this.config.message.type = 'error'
        this.config.message.text =
          typeof err.response !== 'undefined' ? err.response.data.message : err
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
#register {
}
</style>
