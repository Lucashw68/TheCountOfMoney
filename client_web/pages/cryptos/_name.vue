<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <span class="display-2 text-center font-weight-thin">{{
        'Crypto name: ' + name || 'No Crypto'
      }}</span>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  auth: false,

  validate({ params }) {
    return true
  },

  async asyncData({ params }) {
    const name = await params.name
    return { name }
  },
}
</script>
