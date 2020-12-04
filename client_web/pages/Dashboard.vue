<template>
  <v-container id="dashboard" fluid fill-height>
    <transition name="fade" mode="out-in">
      <v-row v-if="intro" justify="center" align="center">
        <span class="display-2 text-center font-weight-light px-4">
          Dashboard
        </span>
        <div class="fingerprint-spinner">
          <div v-for="i in 9" :key="i" class="spinner-ring"></div>
        </div>
      </v-row>

      <span style="width: 100%; height: 100%">
        <v-container fluid fill-height>
          <v-row justify="center" align="center">
            <v-col v-for="(item, id) in buttons" :key="id" cols="1">
              <v-row justify="center">
                <v-btn :to="item.to" fab x-large color="#424242">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>

          <client-only>
            <v-row justify="center" align="center">
              <v-col cols="8">
                <v-row justify="center" align="center">
                  <v-card
                    color="#424242"
                    :style="`height: ${percent(70)}px;`"
                    style="width: 90%"
                  >
                    <v-card-title class="display-1 font-weight-light"
                      >Cryptocurrency list</v-card-title
                    >
                    <v-container fluid>
                      <crypto-card
                        v-for="(item, id) in cryptos"
                        :key="id"
                        :image="item.image"
                        :name="item.name"
                        :value="item.value"
                        class="hover-card"
                        :color="id % 2 === 0 ? '#A0A0A0' : '#848484'"
                      />
                    </v-container>
                  </v-card>
                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row justify="center" align="center">
                  <v-card
                    color="#848484"
                    :style="`height: ${percent(70)}px;`"
                    style="width: 90%"
                  >
                    <v-card-title class="display-1 font-weight-light"
                      >News feed</v-card-title
                    >

                    <v-container fluid>
                      <news-card
                        v-for="(item, id) in news"
                        :key="id"
                        :image="item.image"
                        :title="item.title"
                        :text="item.text"
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
  },

  data: () => ({
    intro: true,
    buttons: [
      {
        name: 'Home',
        to: '/home',
        icon: 'mdi-arrow-left',
      },
      {
        name: 'Currencies settings',
        to: '/dashboard/preferences',
        icon: 'mdi-bitcoin',
      },
      {
        name: 'Articles settings',
        to: '/dashboard/preferences',
        icon: 'mdi-newspaper-variant',
      },
      {
        name: 'Alerts',
        to: '/dashboard/alerts',
        icon: 'mdi-bell-alert',
      },
    ],

    cryptos: [
      {
        name: 'Bitcoin',
        image:
          'https://vangogh.teespring.com/v3/image/HlZAvJt6vXzedAp4hghP0XDzHtY/480/560.jpg',
        value: '15000',
      },
      {
        name: 'Ethereum',
        image:
          'https://btcdirect.eu/media/838/download/ethereum-classic-1.svg?v=3',
        value: '6000',
      },
    ],

    news: [
      {
        title: 'Bitcoin news',
        text: 'Increase of the bitcoin announced... blabla',
        image:
          'https://vangogh.teespring.com/v3/image/HlZAvJt6vXzedAp4hghP0XDzHtY/480/560.jpg',
      },
      {
        title: 'Ethreum news',
        text:
          'The first version of Ethereum 2.0 (ETH 2.0) is now live. The team that designed it called its launch a success. The price of ETH has meanwhile fallen since the announcement.',
        image:
          'https://vangogh.teespring.com/v3/image/HlZAvJt6vXzedAp4hghP0XDzHtY/480/560.jpg',
      },
    ],
  }),

  mounted() {
    setTimeout(() => {
      this.intro = false
    }, 1000)
  },

  methods: {
    percent(percentage) {
      if (process.client) {
        return window.innerHeight * (percentage / 100)
      }
    },
  },
}
</script>

<style scoped>
#dashboard {
}
.hover-card {
  cursor: pointer;
}
</style>
