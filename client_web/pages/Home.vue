<template>
  <v-container id="home" fluid fill-height>
    <v-row justify="center" align="center">
      <span class="display-2 text-center font-weight-light">
        Welcome to a nuxt template
      </span>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  auth: false,

  data: () => ({}),
}
</script>

<style scoped>
#home {
}
</style>
