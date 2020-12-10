<template>
  <v-container id="charts" fluid fill-height>
    <v-row justify="center" align="center">
      <span class="display-2 text-center font-weight-thin"
        >Chart exemple using Vuetify</span
      >
    </v-row>

    <v-row justify="center" align="center">
      <v-btn to="/"> Go back </v-btn>
    </v-row>

    <v-row id="chart" justify="center" align="center">
      <v-sparkline
        v-if="toDraw"
        :value="value"
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
  name: 'Charts',
  layout: 'empty',
  auth: false,

  data: () => ({
    toDraw: false,
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false,
  }),

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

.half-circle-spinner,
.half-circle-spinner * {
  box-sizing: border-box;
}

.half-circle-spinner {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: relative;
}

.half-circle-spinner .circle {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: calc(60px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
  border-top-color: #ff1d5e;
  animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
  border-bottom-color: #ff1d5e;
  animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
