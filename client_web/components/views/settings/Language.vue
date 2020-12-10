<template>
  <v-container id="language-settings" fluid fill-height>
    <v-row justify="center" align="center" class="pt-4">
      <v-card color="#424242" height="400" style="width: 100%">
        <v-container fluid fill-height>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <v-btn fab outlined @click="language--">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <span
                class="text-center font-weight-light"
                :class="$vuetify.breakpoint.smAndDown ? 'text-h5' : 'display-2'"
              >
                {{
                  $t(`settings.language.locales.${languages[language].name}`)
                }}
              </span>
            </v-col>
            <v-col cols="auto">
              <v-btn fab outlined @click="language++">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row justify="center" align="center">
            <v-avatar size="256" color="#424242">
              <v-img :src="languages[language].img" />
            </v-avatar>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LanguageSettings',

  data: () => ({
    language: 0,
    languages: [
      {
        code: 'en',
        name: 'english',
        img:
          'https://cdn.countryflags.com/thumbs/united-kingdom/flag-button-round-250.png',
      },
      {
        code: 'fr',
        name: 'french',
        img:
          'https://cdn.countryflags.com/thumbs/france/flag-button-round-250.png',
      },
    ],
  }),

  watch: {
    language: {
      handler(val) {
        if (val === this.languages.length) {
          this.language = 0
        } else if (val < 0) {
          this.language = this.languages.length - 1
        }
        this.$i18n.setLocale(this.languages[this.language].code)
      },
    },
  },

  mounted() {
    this.language = this.languages.findIndex(
      (item) => item.code === this.$i18n.locale
    )
  },
}
</script>

<style scoped></style>
