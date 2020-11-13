<template>
  <div id="error-view">
    <v-container fluid fill-height>
      <v-row justify="center" align="center">
        <component :is="errorPage" :error="error" />

        <v-col cols="12">
          <v-row justify="center">
            <NuxtLink class="headline font-weight-light white--text" to="/">
              Home page
            </NuxtLink>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import error404 from '@/components/error/404.vue'
import error500 from '@/components/error/500.vue'
export default {
  layout: 'view',
  components: {
    error404,
    error500,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    errorPage() {
      return this.error.statusCode === 404 ? 'error404' : 'error500'
    },
  },
  head() {
    const title = this.error.statusCode === 404 ? '404' : '500'
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
#error-view {
  height: 100%;
  background: #424242;
}
</style>
