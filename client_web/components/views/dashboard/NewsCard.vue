<template>
  <v-row
    justify="center"
    align="center"
    :style="`background-color: ${color};`"
    @click="$router.push({ path: `/articles/${title}` })"
  >
    <v-col cols="2">
      <v-avatar>
        <v-img :src="image" />
      </v-avatar>
    </v-col>

    <v-col cols="10">
      <span class="headline font-weight-light">{{ title }}</span>
      <span class="subtitle font-weight-light">{{ text }}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NewsCard',

  props: {
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
