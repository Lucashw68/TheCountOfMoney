<template>
  <v-row
    justify="center"
    align="center"
    :style="`background-color: ${color};`"
    @click="$router.push({ path: `/articles/${articleId}` })"
  >
    <v-col cols="2">
      <v-avatar class="mx-2">
        <v-img :src="image" />
      </v-avatar>
    </v-col>

    <v-col cols="10">
      <span class="headline font-weight-light">{{ title }}</span>
      <span
        class="subtitle font-weight-light"
        :style="
          $vuetify.breakpoint.mdAndUp
            ? 'display:inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 42ch;'
            : ''
        "
      >
        {{ text }}
      </span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NewsCard',

  props: {
    articleId: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#A0A0A0',
    },
  },

  data: () => ({}),
}
</script>
