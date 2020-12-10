<template>
  <v-row justify="center">
    <v-card
      :flat="$vuetify.breakpoint.mdAndDown"
      class="pa-4"
      :color="computedColor"
      :style="width"
    >
      <v-row justify="center" class="my-4">
        <span class="display-1 font-weight-light">{{ title }}</span>
      </v-row>

      <v-row justify="center" align="center">
        <v-avatar size="256" class="profile-picture">
          <v-img style="background-color: white" :src="image" />
        </v-avatar>
      </v-row>

      <v-row justify="center" class="my-4">
        <span class="headline profile-username font-weight-light">
          {{ name }}
        </span>
      </v-row>

      <v-row justify="center" class="my-4">
        <v-btn outlined @click="$emit('clickButton')">{{ buttonText }}</v-btn>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'ProfileCard',

  props: {
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#424242',
    },
    secondaryColor: {
      type: String,
      default: '#A0A0A0',
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    width() {
      return this.$vuetify.breakpoint.mdAndUp ? 'width: 400px;' : 'width: 100%;'
    },
    computedColor() {
      return this.$vuetify.breakpoint.mdAndDown
        ? this.index % 2 === 0
          ? this.color
          : this.secondaryColor
        : this.color
    },
  },
}
</script>
