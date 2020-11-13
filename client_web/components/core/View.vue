<template>
  <v-main>
    <div id="core-view" :style="'background: ' + gradient">
      <nuxt />
    </div>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CoreView',

  computed: {
    ...mapState('app', ['gradient']),
  },
}
</script>

<style scoped>
#core-view {
  height: 100%;
  background: #424242; /* fallback */
  background-size: 800% 800% !important;
  -webkit-animation: gradient 30s ease-in infinite !important;
  -moz-animation: gradient 30s ease-in infinite !important;
  animation: gradient 30s ease-in infinite !important;
}

@-webkit-keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
