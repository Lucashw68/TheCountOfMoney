<template>
  <v-container id="about" fluid fill-height>
    <v-row justify="center" align="center">
      <article
        class="pa-4"
        :class="$vuetify.breakpoint.mdAndUp ? 'moving border-article' : ''"
      >
        <nuxt-content :document="page" />
      </article>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  auth: false,

  async asyncData({ $content }) {
    const page = await $content('README').fetch()

    return {
      page,
    }
  },

  data: () => ({}),
}
</script>

<style scoped>
#about {
}
.border-article {
  border-radius: 10px;
  border: 2px solid white;
  box-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
}

.moving {
  animation: moving 30s linear infinite !important;
}
@keyframes moving {
  0% {
    transform: translateY(-40px);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
