<template>
  <div class="bars">
    <span class="label" v-html="label" />
    <svg ref="vis" class="vis">
      <g v-for="tick in ticks" v-if="width">
        <line
          :x1="tick.x1"
          :x2="tick.x2"
          :y1="tick.y"
          :y2="tick.y"
          class="tick" />
        <text
          :x="tick.x1 - 5"
          :y="tick.y"
          class="tick"
          text-anchor="end"
          dominant-baseline="middle">
          {{ tick.label }}
        </text>
      </g>
      <g v-for="(el) in elements" v-if="width">
        <path
          :d="el.d"
          :style="{ fill: el.color }"
        />
      </g>
      <line
        :x1="margin.left"
        :x2="width"
        :y1="height / 2"
        :y2="height / 2"
        class="tick zero" />
    </svg>
  </div>
</template>

<script>
import { scaleLinear, scaleBand } from 'd3-scale'
import { map, get, find, isUndefined } from 'lodash'
import { mapState } from 'vuex'

export default {
  props: ['data', 'scenario', 'variables', 'gap'],
  data: () => {
    return {
      colors: ['#aaa', '#feeda1', '#fdbf6f', '#e9f6a1', '#b7e075', '#229c53', '#da372a', '#a50026'],
      width: 0,
      height: 50,
      margin: {
        left: 40,
        right: 10,
        top: 20,
        bottom: 20
      }
    }
  },
  computed: {
    ...mapState({
      region: state => state.settings.region
    }),
    label () {
      const pronom = this.region === 'World' ? 'we' : this.region
      const labels = {
        CPol: `What ${pronom} ${this.region === 'World' ? 'are' : 'is'} <strong>currently</strong> investing <small>(Current policies)</small>`,
        NDC: 'Relative changes for <strong>NDCs</strong>',
        '2C': 'Relative changes for <strong>2°C</strong>',
        '1.5C': 'Relative changes for <strong>1.5°C</strong>'
      }
      return get(labels, this.scenario, this.scenario)
    },
    scaleY () {
      return scaleLinear()
        .range([0, this.height / 2 - this.margin.top])
        .domain([0, 1]).nice()
    },
    scaleX () {
      return scaleBand()
        .range([this.margin.left, this.width - this.margin.right])
        .domain(this.variables)
        .padding(0.3)
    },
    elements () {
      return map(this.variables, (variable, i) => {
        const { change, isPositive } = find(this.data, { variable }, {})
        const x = this.scaleX(variable)
        const y = this.height / 2 + (this.scaleY(change) * (isPositive ? 1 : -1))
        const width = this.scaleX.bandwidth()
        const color = get(this.colors, i, '#222')
        const d = `M${x} ${this.height / 2} L${x} ${y} L${x + width} ${y} L ${x + width} ${this.height / 2} Z`
        return {
          d,
          x,
          y: this.height / 2,
          color
        }
      })
    },
    ticks () {
      const ticks = this.scaleY.ticks(3)
      return map(ticks.concat(ticks), (tick, i) => {
        const isPositive = i <= ticks.length
        return {
          y: this.height / 2 + (this.scaleY(tick) * (isPositive ? -1 : 1)),
          x1: this.margin.left,
          x2: this.width - this.margin.right,
          label: `${isPositive ? '' : '–'}${tick * 100}%`
        }
      })
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  },
  methods: {
    calcSizes () {
      const { vis: el } = this.$refs
      if (!isUndefined(el)) {
        this.height = el.clientHeight || el.parentNode.clientHeight
        this.width = el.clientWidth || el.parentNode.clientWidth
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .bars {
    .vis {
      height: 300px;

      path {
        transition: d $transition-animation;
      }

      line {
        &.tick {
          stroke: #eee;

          &.zero {
            stroke: #aaa;
          }
        }
      }

      .tick {
        font-size: $font-size-small;
        fill: getColor(gray, 60);
        font-family: $font-sans;
      }
    }
  }

</style>
