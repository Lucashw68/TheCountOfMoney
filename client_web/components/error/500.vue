<template>
  <span>
    <v-col cols="12">
      <v-row justify="center">
        <v-avatar size="256">
          <v-img
            src="https://64.media.tumblr.com/e414a762d3a1515ce8454d32c2dec579/tumblr_ogi47qqlfI1utgp6co1_500.gifv"
          />
        </v-avatar>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row justify="center">
        <h1 class="display-2 text-center font-weight-thin">
          Oops.. An error occurred
        </h1>
      </v-row>
    </v-col>
  </span>
</template>

<script>
export default {
  name: 'Error500',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
