<template>
  <material-dialog
    v-if="active"
    :active="active"
    :title="$t('dashboard.button.crypto-settings.name')"
    @update:active="$emit('update:active', $event)"
  >
    <template v-slot:content>
      <v-container fluid fill-height>
        <v-row justify="center" align="center">
          <dynamic-form
            v-if="loaded"
            :config="config"
            @update:config="config = $event"
            @validate="updatePreferences()"
          />
        </v-row>
      </v-container>
    </template>
  </material-dialog>
</template>

<script>
export default {
  name: 'CryptoSettings',

  components: {
    DynamicForm: () => import('~/components/forms/Form.vue'),
    MaterialDialog: () => import('~/components/views/dashboard/Dialog.vue'),
  },

  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    loaded: false,
    config: {
      title: 'dashboard.button.crypto-settings.title',
      validate: 'dashboard.button.crypto-settings.validate',
      message: {
        type: null,
        text: null,
        duration: 5000,
      },
      width: 4,
      icon: 'mdi-cog',
      components: [
        {
          model: null,
          modelName: 'allowedCryptos',
          name: 'inputs-select',
          directive: 'config',
          options: {
            filled: true,
            shaped: true,
            outlined: true,
            label: 'dashboard.button.crypto-settings.favoriteCryptos',
            multiple: true,
            color: 'white',
            items: [],
          },
        },
        {
          model: null,
          modelName: 'currency',
          name: 'inputs-select',
          directive: 'config',
          options: {
            filled: true,
            shaped: true,
            outlined: true,
            label: 'dashboard.button.crypto-settings.currency',
            color: 'white',
            items: [
              { text: 'Euro', value: 'EUR' },
              { text: 'United States Dollar', value: 'USD' },
              { text: 'Chinese Yuan', value: 'CNY' },
              { text: 'Japanese Yen', value: 'JPY' },
            ],
          },
        },
      ],
    },
  }),

  computed: {
    loggedInUser() {
      return this.$store.state.auth.user
    },

    currencies: {
      get() {
        return this.config.components[1].model
      },
      set(val) {
        this.config.components[1].model = val
      },
    },

    cryptos_list_model: {
      get() {
        return this.config.components[0].model
      },
      set(val) {
        this.config.components[0].model = val
      },
    },

    cryptos_list_items: {
      get() {
        return this.config.components[0].model
      },
      set(val) {
        this.config.components[0].options.items = val
      },
    },
  },

  mounted() {
    this.getPreferences().then(() => {
      this.loaded = true
    })
  },

  methods: {
    async getPreferences() {
      try {
        const res = await this.$axios.$get('/app/preferences', {
          headers: {
            Authorization: `${this.$auth.getToken('local')}`,
          },
        })
        this.cryptos_list_items = res.preferences.cryptos_list
        this.cryptos_list_model = this.loggedInUser.preferences.cryptos_list
        this.currencies = this.loggedInUser.preferences.currency
      } catch (err) {
        console.log(err)
      }
    },

    async updatePreferences() {
      try {
        await this.$axios.$put(
          '/users/profile',
          {
            preferences: {
              currency: this.getModel('currency'),
              keywords_list: this.loggedInUser.keywords_list,
              cryptos_list: this.getModel('allowedCryptos'),
            },
          },
          {
            headers: {
              Authorization: `${this.$auth.getToken('local')}`,
            },
          }
        )
        await this.$auth.fetchUser()
        this.$emit('change')
        this.getPreferences()
      } catch (err) {
        console.log(err)
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
