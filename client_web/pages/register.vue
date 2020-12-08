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
      title: 'register.title',
      validate: 'register.validate',
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
            label: 'register.label-username',
            counter: 0,
            rules: [
              (v) => !!v || 'register.rules.username-required',
              (v) => (v && v.length > 2) || 'register.rules.username-length',
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
            label: 'register.label-email',
            counter: 0,
            rules: [
              (v) => !!v || 'register.rules.email-required',
              (v) => /.+@.+\.+./.test(v) || 'register.rules.email-invalid',
              (v) => (v && v.length > 4) || 'register.rules.email-length',
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
            label: 'register.label-password',
            counter: 0,
            rules: [
              (v) => !!v || 'register.rules.password-required',
              (v) => (v && v.length > 7) || 'register.rules.password-length',
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
        this.config.message.text = this.$i18n.t('register.success')
        this.$router.push({ path: this.localePath('index') })
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
