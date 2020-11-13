<template>
  <span>
    <v-col cols="12">
      <v-row justify="center">
        <v-avatar color="white" size="256">
          <v-img
            src="https://p.kindpng.com/picc/s/716-7160710_game-dino-dinossauro-google-googlechrome-chrome-t-rex.png"
          >
          </v-img>
        </v-avatar>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row justify="center">
        <h1 class="display-2 text-center font-weight-thin">
          Oops.. 404 Not Found
        </h1>
      </v-row>
    </v-col>
  </span>
</template>

<script>
export default {
  name: 'Error404',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
