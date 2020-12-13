<template>
  <material-dialog
    v-if="active"
    :active="active"
    :title="$t('dashboard.button.app-settings.name')"
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
  name: 'AppSettings',

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
      title: 'dashboard.button.app-settings.title',
      validate: 'dashboard.button.app-settings.validate',
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
          modelName: 'n',
          name: 'input-slider',
          directive: 'config',
          options: {
            title: 'dashboard.button.app-settings.n.title',
            min: 1,
            max: 50,
          },
        },
        {
          model: null,
          modelName: 'k',
          name: 'input-slider',
          directive: 'config',
          options: {
            title: 'dashboard.button.app-settings.k.title',
            min: 1,
            max: 50,
          },
        },
        {
          model: null,
          modelName: 'allowedCryptos',
          name: 'inputs-select',
          directive: 'config',
          options: {
            filled: true,
            shaped: true,
            outlined: true,
            label: 'dashboard.button.app-settings.allowedCryptos',
            multiple: true,
            color: 'white',
            items: [],
          },
        },
        {
          model: null,
          modelName: 'rssFeeds',
          name: 'input-combobox',
          directive: 'config',
          options: {
            filled: true,
            shaped: true,
            outlined: true,
            label: 'dashboard.button.app-settings.rssFeeds',
            multiple: true,
            deletable: true,
            smallchips: true,
            color: 'white',
            items: [],
          },
        },
      ],
    },
  }),

  computed: {
    n: {
      get() {
        return this.getModel('n')
      },
      set(val) {
        this.config.components[0].model = val
      },
    },
    k: {
      get() {
        return this.getModel('k')
      },
      set(val) {
        this.config.components[1].model = val
      },
    },
    cryptos_list: {
      get() {
        return this.config.components[2].model
      },
      set(val) {
        this.config.components[2].model = val
        this.config.components[2].options.items = val
      },
    },
    feeds_list: {
      get() {
        return this.config.components[3].model
      },
      set(val) {
        this.config.components[3].model = val
        this.config.components[3].options.items = val
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
        const res = await this.$axios.$get('/app/preferences')
        this.n = res.preferences.n
        this.k = res.preferences.k
        this.cryptos_list = res.preferences.cryptos_list
        this.feeds_list = res.preferences.feeds_list
      } catch (err) {
        console.log(err)
      }
    },

    async updatePreferences() {
      try {
        await this.$axios.$put(
          '/app/preferences',
          {
            k: this.k,
            n: this.n,
            cryptos_list: this.getModel('allowedCryptos'),
            feeds_list: this.getModel('rssFeeds'),
          },
          {
            headers: {
              Authorization: `${this.$auth.getToken('local')}`,
            },
          }
        )
        this.getPreferences()
        this.$emit('change')
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
