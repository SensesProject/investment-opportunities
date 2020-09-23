<template>
  <div class="bars">
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
          v-tooltip="el.tooltip"
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
import { map, find, isUndefined, compact, range } from 'lodash'
import { mapState } from 'vuex'
import { getColor, calcBar } from '../assets/js/utils.js'

export default {
  props: ['data', 'options', 'gap'],
  data: () => {
    return {
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
      region: state => state.settings.region,
      isColored: state => state.settings.isColored
    }),
    scaleY () {
      return scaleLinear()
        .range([0, this.height / 2 - this.margin.top])
        .domain([0, 1]).nice()
    },
    scaleX () {
      return scaleBand()
        .range([this.margin.left, this.width - this.margin.right])
        .domain(range(this.options.length))
        .padding(0.3)
    },
    yBase () {
      return this.height / 2
    },
    barWidth () {
      return this.scaleX.bandwidth()
    },
    elements () {
      const { yBase, barWidth, options, data, isColored } = this

      return compact(map(options, (option, i) => {
        const datum = find(data, option)
        if (!datum) { return false }
        console.log({ datum, option, i })
        const { change, isPositive, variable, region } = datum
        const x = this.scaleX(i)
        const y = yBase + (this.scaleY(change) * (isPositive ? 1 : -1))
        return {
          tooltip: `Variable: ${variable}<br />Change: ${change}<br />Region: ${region}`,
          d: calcBar(x, yBase, y, barWidth),
          x,
          y: yBase,
          color: isColored ? getColor(variable) : '#222'
        }
      }))
    },
    ticks () {
      const { margin, yBase, barWidth } = this
      const ticks = this.scaleY.ticks(3)
      return map(ticks.concat(ticks), (tick, i) => {
        const isPositive = i <= ticks.length
        return {
          y: yBase + (this.scaleY(tick) * (isPositive ? -1 : 1)),
          x1: margin.left,
          x2: barWidth - margin.right,
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
