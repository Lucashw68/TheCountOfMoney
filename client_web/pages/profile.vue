<template>
  <v-container
    id="profile"
    fill-height
    fluid
    :style="
      $vuetify.breakpoint.mdAndDown
        ? 'background: #424242 !important;'
        : 'background: inherit;'
    "
  >
    <v-row justify="center" align="center">
      <span
        v-show="$vuetify.breakpoint.mdAndUp"
        class="display-2 text-center font-weight-light"
      >
        {{ $t('profile.title') }}
      </span>
    </v-row>

    <transition-group
      name="list"
      tag="div"
      class="row no-gutters align-stretch justify-center"
    >
      <v-col
        v-for="(item, index) in displayServices"
        :key="item.title"
        :cols="dynamicCols"
      >
        <profile-card
          :index="index"
          :title="item.title"
          :name="item.name"
          :image="item.image"
          :button-text="item.buttonText"
          @clickButton="handleFunction(item.service)"
        />
      </v-col>

      <v-col v-if="selected !== null" key="edit-view" cols="8">
        <component
          :is="selected.component"
          :index="0"
          :title="$t(selected.title)"
          :button-text="$t('profile.delete')"
        />
      </v-col>
    </transition-group>
  </v-container>
</template>

<script>
export default {
  name: 'Profile',
  auth: true,

  components: {
    ProfileCard: () => import('~/components/views/profile/ProfileCard.vue'),
    ProfileEditCard: () =>
      import('~/components/views/profile/ProfileEditCard.vue'),
    ProfileViewCard: () =>
      import('~/components/views/profile/ProfileViewCard.vue'),
  },

  data: () => ({
    selected: null,
    waited: false,
  }),

  computed: {
    dynamicCols() {
      return this.$vuetify.breakpoint.mdAndDown
        ? 12
        : 12 /
            (this.displayServices.length === 1
              ? 4
              : this.displayServices.length)
    },

    loggedInUser() {
      return this.$store.state.auth.user
    },

    displayServices() {
      return this.selected !== null
        ? this.services.filter((item) => item.service === this.selected.service)
        : this.services
    },

    accountStrategy() {
      return this.$store.state.auth.user.provider === 'local'
        ? 'Email'
        : this.$store.state.auth.user.provider.charAt(0).toUpperCase() +
            this.$store.state.auth.user.provider.slice(1)
    },

    services() {
      const services = [
        {
          service: 'email',
          component: 'profile-card',
          title: `${this.accountStrategy} ${this.$i18n.t('profile.account')}`,
          name:
            this.loggedInUser.username || this.loggedInUser.email || '- - -',
          image:
            this.$store.state.auth.user.provider === 'local'
              ? `https://avatars.dicebear.com/v2/male/${this.loggedInUser.email}.svg`
              : this.loggedInUser[`${this.$store.state.auth.user.provider}`]
                  .avatar,
          buttonText:
            this.accountStrategy === 'Email'
              ? this.selected !== null
                ? this.$i18n.t('profile.button.back')
                : this.$i18n.t('profile.button.edit')
              : this.$i18n.t('profile.button.view'),
          color: '#424242',
        },
        {
          service: 'gmail',
          component: 'profile-card',
          title: this.$i18n.t('profile.services.gmail.title'),
          name: this.isServiceAssociated('gmail')
            ? this.loggedInUser.gmail.email
            : '- - -',
          image:
            'https://www.shareicon.net/data/2015/10/03/111547_email_512x512.png',
          buttonText: this.isServiceAssociated('gmail')
            ? this.$i18n.t('profile.services.gmail.button-disassociate')
            : this.$i18n.t('profile.services.gmail.button-associate'),
          color: this.isServiceAssociated('gmail') ? 'red' : '#424242',
        },
        {
          service: 'twitter',
          component: 'profile-card',
          title: this.$i18n.t('profile.services.twitter.title'),
          name: '- - -',
          image:
            'https://culliganrecrute.fr/wp-content/uploads/2018/01/twitter-logo-1-1.png',
          buttonText: this.$i18n.t('profile.services.twitter.button'),
          color: 'transparent',
        },
      ]
      return services
    },
  },

  mounted() {
    if (
      Object.keys(this.$route.query).length > 0 &&
      typeof this.$route.query.service !== 'undefined' &&
      this.$route.query.success === 'true'
    ) {
      this.addService(this.$route.query.service)
    }
  },

  methods: {
    handleFunction(functionName) {
      this[functionName]()
    },

    addService(service) {
      this.$router.push({ path: this.localePath('profile') })
    },

    isServiceAssociated(service) {
      return !!this.loggedInUser[service]
    },

    email() {
      this.selected =
        this.selected === null
          ? this.$store.state.auth.user.provider === 'local'
            ? {
                service: 'email',
                component: 'profile-edit-card',
                title: 'profile.edit',
              }
            : {
                service: 'email',
                component: 'profile-view-card',
                title: 'profile.view',
              }
          : null
    },
    gmail() {
      const token = this.$auth.getToken('local')
      location.replace(
        `${this.$axios.defaults.baseURL}/users/auth/gmail` +
          '?token=' +
          token.slice(7)
      )
    },
    twitter() {
      console.log('Button twitter')
    },
  },
}
</script>

<style scoped>
#profile {
  overflow-y: hidden !important;
}
.profile-picture {
  border: 4px solid #424242;
}
.profile-username {
}

.list-enter-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
.list-move {
  transition: all 1s;
}
</style>
