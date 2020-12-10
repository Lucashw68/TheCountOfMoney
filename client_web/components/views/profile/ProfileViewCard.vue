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

      <v-row justify="center" align="center" style="height: 256px">
        <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 10">
          <v-row justify="center">
            <span class="overline text-center">
              Email: {{ this.$store.state.auth.user.email }}
            </span>
          </v-row>

          <v-row justify="center">
            <span class="overline text-center">
              Username: {{ this.$store.state.auth.user.username }}
            </span>
          </v-row>

          <v-row justify="center">
            <span class="overline text-center">
              Provider: {{ this.$store.state.auth.user.provider }}
            </span>
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center" class="my-4">
        <span class="headline profile-username font-weight-light">
          {{ username || name }}
        </span>
      </v-row>

      <v-row justify="center" class="my-4">
        <v-btn color="red" outlined @click="$emit('clickButton')">{{
          buttonText
        }}</v-btn>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'ProfileFormCard',

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

  data: () => ({
    usernameValue: null,
    emailValue: null,
    passwordValue: null,
  }),

  computed: {
    username() {
      return this.$store.state.auth.user.username
    },

    email() {
      return this.$store.state.auth.user.email
    },

    width() {
      return this.$vuetify.breakpoint.mdAndUp ? 'width: 95%;' : 'width: 100%;'
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
