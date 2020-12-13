<template>
  <v-container fluid fill-height>
    <v-row
      justify="center"
      :style="
        $vuetify.breakpoint.mdAndUp
          ? 'position: absolute;top: 150px;left: 100px;'
          : ''
      "
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :fab="$vuetify.breakpoint.mdAndUp"
            :block="$vuetify.breakpoint.mdAndDown"
            x-large
            v-bind="attrs"
            v-on="on"
            @click="$router.go(-1)"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('dashboard.article.back') }}</span>
      </v-tooltip>
    </v-row>

    <v-row justify="center">
      <span
        class="text-center font-weight-thin px-4"
        :class="$vuetify.breakpoint.mdAndDown ? 'display-1' : 'display-2'"
      >
        {{ crypto.name }}</span
      >
    </v-row>

    <v-row id="chart" justify="center" align="center">
      <v-sparkline
        v-if="toDraw"
        :value="chartValue"
        :gradient="gradient"
        :smooth="radius || false"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        auto-draw
      ></v-sparkline>

      <v-row v-else justify="center">
        <div class="half-circle-spinner" style="height: 480px">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </v-row>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-btn block @click=";(fill = !fill), redraw()"> Fill </v-btn>
      </v-col>

      <v-col cols="4">
        <v-btn v-if="radius" block @click=";(radius = 0), redraw()">
          Hard
        </v-btn>
        <v-btn v-else block @click=";(radius = 10), redraw()"> Smooth </v-btn>
      </v-col>

      <v-col cols="4">
        <v-btn v-if="type === 'trend'" block @click=";(type = 'bar'), redraw()">
          Bar
        </v-btn>
        <v-btn v-else block @click=";(type = 'trend'), redraw()"> Trend </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {
  layout: 'empty',
  auth: false,

  asyncData({ params, $axios, error }) {
    return $axios
      .$get(`${$axios.defaults.baseURL}/cryptos?cmids=${params.cmid}`)
      .then((res) => {
        return { crypto: res[0], cmid: params.cmid }
      })
      .catch((err) => {
        error({ statusCode: 404, message: err.message })
      })
  },

  data: () => ({
    crypto: {},
    cmid: '',
    toDraw: false,
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[5],
    chartValue: [],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false,
  }),

  validate({ params }) {
    return true
  },

  watch: {
    toDraw: {
      handler(val) {
        if (!val) {
          setTimeout(() => {
            this.toDraw = true
          }, 500)
        }
      },
    },
  },

  mounted() {
    for (let i = 0; i !== 10; i++) {
      this.chartValue.push(
        Math.random() * (this.crypto.highestDay - this.crypto.lowestDay) +
          this.crypto.lowestDay
      )
    }
    this.chartValue.push(this.crypto.currentPrice)
    this.toDraw = true
  },

  methods: {
    redraw() {
      this.toDraw = false
    },
  },
}
</script>

<style scoped>
#chart {
  display: block !important;
}
</style>
