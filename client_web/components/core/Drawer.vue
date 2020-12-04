<template>
  <v-navigation-drawer
    v-model="drawerStatus"
    :mini-variant="mini"
    style="box-shadow: 0px 0px 10px 1px #121212"
    disable-route-watcher
    app
  >
    <v-container v-if="!mini" fluid>
      <v-row justify="center">
        <v-avatar>
          <v-img :src="require('~/static/logo.png')" />
        </v-avatar>
      </v-row>
      <v-row justify="center">
        <span class="headline font-weight-light">TheCountOfMoney</span>
      </v-row>
    </v-container>

    <v-container v-else fluid>
      <v-row justify="center">
        <v-avatar :size="mini ? 36 : 48">
          <v-img :src="require('~/static/logo.png')" />
        </v-avatar>
      </v-row>
    </v-container>

    <v-divider
      v-if="!mini"
      style="
        margin-top: 30px;
        width: 70%;
        margin-left: auto;
        margin-right: auto;
      "
    />

    <v-list :shaped="!mini" :style="mini ? 'margin-top: 20vh;' : ''">
      <v-list-item
        v-for="(item, i) in topPaths"
        :key="i"
        active-class="border"
        class="my-4 top-paths"
        :to="item.path"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="paths" v-text="item.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-if="!isAuthenticated" class="bot-paths" :shaped="!mini">
      <v-list-item
        v-for="(item, i) in botPaths"
        :key="i"
        active-class="border"
        class="my-4"
        color="white"
        :to="item.path"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="paths" v-text="item.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-else class="bot-paths" :shaped="!mini">
      <v-list-item
        active-class="border"
        class="my-4"
        color="white"
        router
        exact
        @click.stop="logout()"
      >
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="paths"> Logout </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Paths from '@/router/paths.js'
export default {
  name: 'CoreDrawer',

  data: () => ({}),

  computed: {
    ...mapState('app', ['mini', 'drawer']),

    isAuthenticated() {
      return this.$auth.loggedIn
    },

    loggedInUser() {
      return this.$auth.user
    },

    drawerStatus: {
      get() {
        return this.drawer
      },
      set(val) {
        this.setDrawer(val)
      },
    },

    topPaths() {
      return Paths.filter(
        (path) =>
          path.group === 'top' &&
          (!this.isAuthenticated ? path.public === true : true)
      )
    },

    botPaths() {
      return Paths.filter((path) => path.group === 'bot')
    },
  },

  methods: {
    ...mapMutations('app', ['setDrawer']),

    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push({ path: '/' })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
.top-paths {
  padding-top: 4px;
  padding-bottom: 4px;
}
.bot-paths {
  bottom: 0;
  position: absolute;
  width: 100%;
}
.v-list-item__title {
  font-size: 1.3em;
  font-weight: 300;
}
.border {
  background-color: cyan;
  background-color: rgba(0, 255, 255, 0.5);
}
.border:hover {
  border: 2px solid cyan;
}
</style>
