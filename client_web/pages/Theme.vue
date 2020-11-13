<template>
  <v-container id="theme" fluid fill-height>
    <v-row justify="center" align="center">
      <span class="display-2 text-center font-weight-light">
        Theme of the application
      </span>
    </v-row>

    <v-row justify="center" align="center">
      <template v-for="(color, index) in colors">
        <v-col :key="index">
          <v-card class="mx-auto my-4 shadow" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">COLOR</div>
                <v-list-item-title class="headline mb-1">
                  {{ color }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                :color="color"
              ></v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
        <v-responsive
          v-if="index % 2 === 0"
          :key="`width-${index}`"
          width="100%"
        ></v-responsive>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Theme',
  auth: false,

  data: () => ({
    colors: [
      'primary',
      'secondary',
      'accent',
      'info',
      'warning',
      'error',
      'success',
    ],
  }),
}
</script>

<style scoped>
#theme {
}
.shadow {
  -webkit-box-shadow: -10px -10px 20px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -10px -10px 20px -10px rgba(0, 0, 0, 0.75);
  box-shadow: -10px -10px 20px -10px rgba(0, 0, 0, 0.75);
}
</style>
