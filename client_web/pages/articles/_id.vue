<template>
  <v-container fluid fill-height>
    <v-row
      justify="center"
      :style="
        $vuetify.breakpoint.mdAndUp
          ? 'position: absolute;top: 150px;left: 100px;'
          : ''
      "
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :fab="$vuetify.breakpoint.mdAndUp"
            :block="$vuetify.breakpoint.mdAndDown"
            x-large
            v-bind="attrs"
            v-on="on"
            @click="$router.go(-1)"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('dashboard.article.back') }}</span>
      </v-tooltip>
    </v-row>

    <v-row justify="center">
      <span
        class="text-center font-weight-thin px-4"
        :class="$vuetify.breakpoint.mdAndDown ? 'display-1' : 'display-2'"
      >
        {{ article.title }}</span
      >
    </v-row>

    <v-row justify="center">
      <span class="subtitle text-center font-weight-thin px-4">
        {{
          $vuetify.breakpoint.mdAndUp
            ? $moment(article.date).format('LLLL') +
              ' | ' +
              $moment(article.date).fromNow()
            : $moment(article.date).fromNow()
        }}
      </span>
    </v-row>

    <v-row justify="center">
      <v-col :cols="$vuetify.breakpoint.mdAndDown ? 12 : 8">
        <v-row justify="center">
          <v-img
            :src="article.imageArticle"
            height="300"
            style="border-radius: 60px"
          />
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <span class="headline text-center font-weight-thin px-2">{{
        article.summary
      }}</span>
    </v-row>

    <v-row justify="center">
      <v-col :cols="$vuetify.breakpoint.mdAndDown ? 10 : 8">
        <v-row justify="center">
          <span class="headline text-center font-weight-thin">{{
            'Link: '
          }}</span>
        </v-row>

        <v-row justify="center">
          <span
            class="link headline text-center purple--text font-weight-thin"
            style="
              text-oveflow: ellipsis;
              overflow-wrap: break-word;
              word-break: break-all;
            "
            @click="redirect(article.url)"
            >{{ article.url }}</span
          >
        </v-row>
      </v-col>

      <v-col :cols="$vuetify.breakpoint.mdAndDown ? 10 : 8">
        <v-row justify="center">
          <span class="headline text-center font-weight-thin">{{
            'Source:'
          }}</span>
        </v-row>

        <v-row justify="center">
          <span
            class="link headline text-center purple--text font-weight-thin"
            style="
              text-oveflow: ellipsis;
              overflow-wrap: break-word;
              word-break: break-all;
            "
            @click="redirect(article.source)"
            >{{ article.source }}</span
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  auth: false,

  asyncData({ params, $axios, error }) {
    return $axios
      .$get(`${$axios.defaults.baseURL}/articles/${params.id}`)
      .then((res) => {
        return { article: res.article }
      })
      .catch((err) => {
        error({ statusCode: 404, message: err.message })
      })
  },

  data: () => ({
    article: {},
  }),

  validate({ params }) {
    return true
  },

  methods: {
    redirect(url) {
      location.replace(url)
    },
  },
}
</script>

<style scoped>
.link {
  text-oveflow: ellipsis;
  overflow-wrap: break-word;
  word-break: break-all;
  transition: all 1s;
}
.link:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: all 1s;
}
</style>
