<template>
  <v-row
    justify="center"
    align="center"
    :style="`background-color: ${color};`"
    @click="$router.push({ path: `/cryptos/${cmid}` })"
  >
    <v-col v-if="!responsive" cols="2">
      <v-avatar>
        <v-img :src="image" />
      </v-avatar>
    </v-col>

    <v-col :cols="responsive ? 6 : 2">
      <span class="headline font-weight-light">{{ name }}</span>
    </v-col>

    <v-col :cols="responsive ? 6 : 4">
      <v-row id="chart" justify="center" align="center">
        <v-sparkline
          v-if="toDraw"
          :style="responsive ? 'height: 32px;' : 'height: 64px;'"
          height="64"
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
          <div class="half-circle-spinner" style="height: 64px">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
          </div>
        </v-row>
      </v-row>
    </v-col>

    <v-col v-if="!responsive" cols="2">
      <span class="headline font-weight-light">{{ currentPrice }}€</span>
    </v-col>

    <v-col v-if="!responsive" cols="2">
      <span class="headline font-weight-light">{{ cmid }}</span>
    </v-col>
  </v-row>
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
  name: 'CryptoCard',

  props: {
    name: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    currentPrice: {
      type: Number,
      default: 0,
    },
    cmid: {
      type: String,
      default: '',
    },
    openingPrice: {
      type: Number,
      default: 0,
    },
    highestDay: {
      type: Number,
      default: 0,
    },
    lowestDay: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#A0A0A0',
    },
  },

  data: () => ({
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

  computed: {
    responsive() {
      return this.$vuetify.breakpoint.mdAndDown
    },
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
        Math.random() * (this.highestDay - this.lowestDay) + this.lowestDay
      )
    }
    this.chartValue.push(this.currentPrice)
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
