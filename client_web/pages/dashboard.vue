<template>
  <v-container id="dashboard" fluid fill-height>
    <transition name="fade" mode="out-in">
      <v-row v-if="intro" justify="center" align="center">
        <span class="display-2 text-center font-weight-light px-4">
          {{ $t('dashboard.title') }}
        </span>
        <div class="fingerprint-spinner">
          <div v-for="i in 9" :key="i" class="spinner-ring"></div>
        </div>
      </v-row>

      <span v-if="!intro" style="width: 100%; height: 100%">
        <v-container
          fluid
          fill-height
          :class="$vuetify.breakpoint.mdAndDown ? 'pa-0' : 'padding: inherit'"
        >
          <v-row justify="center" align="center">
            <v-col
              v-if="$vuetify.breakpoint.mdAndUp"
              cols="2"
              class="text-center"
              style="position: absolute; left: 100px"
            >
              <span class="display-2 font-weight-light pa-4 dashboard-title">
                {{ $t('dashboard.title') }}
              </span>
            </v-col>

            <v-col
              v-for="(item, id) in displayButtons"
              :key="id"
              :cols="$vuetify.breakpoint.mdAndDown ? 12 / buttons.length : 1"
            >
              <v-row justify="center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      v-bind="attrs"
                      color="#424242"
                      class="dashboard-buttons"
                      :to="!!item.to ? localePath(item.to) : undefined"
                      :x-large="$vuetify.breakpoint.mdAndUp"
                      :large="$vuetify.breakpoint.mdAndDown"
                      :disabled="item.disabled"
                      v-on="on"
                      @click="
                        !!item.click ? handleFunction(item.click) : undefined
                      "
                    >
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ item.name }}</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>

          <client-only>
            <v-row justify="center" align="center">
              <v-col :cols="$vuetify.breakpoint.mdAndUp ? 8 : 12">
                <v-row justify="center" align="center">
                  <v-card
                    color="#424242"
                    :style="
                      $vuetify.breakpoint.mdAndDown
                        ? `max-height: ${percent(70)}px;`
                        : `height: ${percent(70)}px;`
                    "
                    style="width: 90%"
                  >
                    <v-card-title
                      class="display-1 text-center font-weight-light titlelink"
                      @click="getCryptos()"
                      >{{ $t('dashboard.currencies') }}</v-card-title
                    >
                    <v-container
                      fluid
                      :style="`overflow-y: auto; height: ${percent(60)}px;`"
                    >
                      <crypto-card
                        v-for="(item, id) in cryptos"
                        :key="id"
                        :image="item.image"
                        :name="item.name"
                        :current-price="item.currentPrice"
                        :opening-price="item.openingPrice"
                        :lowest-day="item.lowestDay"
                        :highest-day="item.highestDay"
                        :cmid="item.cmid"
                        class="hover-card"
                        :color="id % 2 === 0 ? '#A0A0A0' : '#848484'"
                      />
                    </v-container>
                  </v-card>
                </v-row>
              </v-col>

              <v-col :cols="$vuetify.breakpoint.mdAndUp ? 4 : 12">
                <v-row justify="center" align="center">
                  <v-card
                    :color="$vuetify.breakpoint.mdAndUp ? '#848484' : '#424242'"
                    :style="
                      $vuetify.breakpoint.mdAndDown
                        ? `max-height: ${percent(70)}px;`
                        : `height: ${percent(70)}px;`
                    "
                    style="width: 90%"
                  >
                    <v-card-title
                      class="display-1 text-center font-weight-light titlelink"
                      @click="getArticles()"
                      >{{ $t('dashboard.newsfeed') }}</v-card-title
                    >

                    <v-container
                      fluid
                      :style="`overflow-y: auto; height: ${percent(60)}px;`"
                    >
                      <news-card
                        v-for="(item, id) in news"
                        :key="id"
                        :article-id="item._id"
                        :image="item.imageFeed"
                        :title="item.title"
                        :text="item.summary"
                        class="hover-card"
                        :color="id % 2 === 0 ? '#A0A0A0' : '#636363'"
                      />
                    </v-container>
                  </v-card>
                </v-row>
              </v-col>
            </v-row>
          </client-only>
        </v-container>
        <crypto-settings
          v-if="isAuthenticated"
          :active="cryptoSettings"
          @change="refreshDashboard"
          @update:active="cryptoSettings = false"
        />
        <article-settings
          v-if="isAuthenticated"
          :active="articleSettings"
          @update:active="articleSettings = false"
        />
        <app-settings
          v-if="authorized('admin') && appSettings"
          :active="appSettings"
          @change="refreshDashboard()"
          @update:active="appSettings = false"
        />
      </span>
    </transition>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  auth: false,
  layout: 'view',

  components: {
    CryptoCard: () => import('~/components/views/dashboard/CryptoCard.vue'),
    NewsCard: () => import('~/components/views/dashboard/NewsCard.vue'),
    CryptoSettings: () =>
      import('~/components/views/dashboard/settings/CryptoSettings.vue'),
    ArticleSettings: () =>
      import('~/components/views/dashboard/settings/ArticleSettings.vue'),
    AppSettings: () =>
      import('~/components/views/dashboard/settings/AppSettings.vue'),
  },

  data: () => ({
    k: 0,
    n: 0,
    intro: true,
    appSettings: false,
    cryptoSettings: false,
    articleSettings: false,
    cryptos_list: [],
    cryptos: [],
    news: [],
  }),

  computed: {
    buttons() {
      const buttons = [
        {
          name: this.$i18n.t('dashboard.button.home.name'),
          to: 'home',
          icon: 'mdi-arrow-left',
          disabled: false,
          access: ['guest', 'user', 'admin'],
        },
        {
          name: this.$i18n.t('dashboard.button.crypto-settings.name'),
          icon: 'mdi-bitcoin',
          click: 'dialogUserPreferences',
          disabled: false,
          access: ['user', 'admin'],
        },
        {
          name: this.$i18n.t('dashboard.button.article-settings.name'),
          icon: 'mdi-newspaper-variant',
          click: 'dialogArticlePreferences',
          disabled: false,
          access: ['user', 'admin'],
        },
        {
          name: this.$i18n.t('dashboard.button.alerts.name'),
          icon: 'mdi-bell-alert',
          disabled: true,
          access: ['user', 'admin'],
        },
        {
          name: this.$i18n.t('dashboard.button.app-settings.name'),
          icon: 'mdi-cog',
          click: 'dialogAppPreferences',
          disabled: false,
          access: ['admin'],
        },
      ]
      return buttons
    },

    displayButtons() {
      return this.buttons.filter(
        (item) =>
          item.access.includes('guest') ||
          item.access.includes(
            this.isAuthenticated ? this.loggedInUser.role : 'guest'
          )
      )
    },

    isAuthenticated() {
      return this.$store.state.auth.loggedIn
    },

    loggedInUser() {
      return this.$store.state.auth.user
    },
  },

  mounted() {
    this.getPreferences().then(() => {
      this.getArticles()
      this.getCryptos()
    })
    setTimeout(() => {
      this.intro = false
    }, 1000)
  },

  methods: {
    refreshDashboard() {
      this.getPreferences().then(() => {
        this.getArticles()
        this.getCryptos()
      })
    },

    async getPreferences() {
      try {
        const res = await this.$axios.$get('/app/preferences')
        this.n = res.preferences.n
        this.k = res.preferences.k
        this.cryptos_list = res.preferences.cryptos_list
      } catch (err) {
        console.log(err)
      }
    },

    async getArticles() {
      try {
        const res = await this.$axios.get('/articles' + '?length=' + this.k)
        this.news = []
        res.data.articles.forEach((article) => {
          this.news.push(article)
        })
      } catch (err) {
        console.log(err)
      }
    },

    async getCryptos() {
      try {
        const res = await this.$axios.get(
          '/cryptos?cmids=' +
            (this.isAuthenticated
              ? this.loggedInUser.preferences.cryptos_list
                  .slice()
                  .reverse()
                  .join()
              : this.cryptos_list.join())
        )
        this.cryptos = []
        res.data.forEach((crypto) => {
          this.cryptos.push(crypto)
        })
      } catch (err) {
        console.log(err)
      }
    },

    percent(percentage) {
      if (process.client) {
        return window.innerHeight * (percentage / 100)
      }
    },

    handleFunction(functionName) {
      this[functionName]()
    },

    authorized(role) {
      return this.isAuthenticated ? this.loggedInUser.role === role : false
    },

    dialogUserPreferences() {
      this.cryptoSettings = true
    },

    dialogArticlePreferences() {
      this.articleSettings = true
    },

    dialogAppPreferences() {
      this.appSettings = true
    },
  },
}
</script>

<style scoped>
#dashboard {
}
.hover-card {
  transition: all 1s;
}
.hover-card:hover {
  cursor: pointer;
  transform: scaleY(1.1);
  transition: all 1s;
}
.dashboard-buttons {
  transition: all 1s;
}
.dashboard-buttons:hover {
  transform: scale(1.05);
  transition: all 1s;
}
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #a0a0a0 !important;
}
.titlelink {
  transition: all 1s;
}
.titlelink:hover {
  transition: all 1s;
  cursor: pointer;
  text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
}
.dashboard-title {
  border-radius: 20px;
  text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
}
</style>
