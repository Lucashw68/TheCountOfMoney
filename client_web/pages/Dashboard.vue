<template>
  <v-container id="dashboard" fluid fill-height>
    <v-row justify="center" align="center">
      <span class="display-2 text-center font-weight-light"> Dashboard </span>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  auth: false,
  layout: 'view',

  data: () => ({}),
}
</script>

<style scoped>
#dashboard {
}
</style>
