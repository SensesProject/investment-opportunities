<template>
  <figure>
    <header>
      <h4><slot name="header"></slot></h4>
    </header>
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
    <figcaption><slot name="caption"></slot></figcaption>
  </figure>
</template>

<script>
import { scaleLinear, scaleBand } from 'd3-scale'
import { map, find, isUndefined, compact, range, get, forEach } from 'lodash'
import { mapState, mapGetters } from 'vuex'
import { format } from 'd3-format'
import { getColorFromVariable, calcBar } from '../assets/js/utils.js'

export default {
  props: ['variables', 'scenarios'],
  data: () => {
    return {
      gap: 20,
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
    ...mapGetters([
      'data'
    ]),
    scaleY () {
      return scaleLinear()
        .range([0, this.height / 2 - this.margin.top])
        .domain([0, 2])
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
    options () {
      const arr = []
      forEach(this.variables, (variable) => {
        forEach(this.scenarios, (scenario) => {
          arr.push({ variable, scenario })
        })
      })
      return arr
    },
    elements () {
      const { yBase, barWidth, options, data } = this

      return compact(map(options, (option, i) => {
        const datum = find(data, option)
        if (!datum) { return false }
        const { variable, region, value } = datum
        const [change, isPositive] = get(datum, ['changes', 'average'], [])
        const x = this.scaleX(i)
        const y = yBase + (this.scaleY(change) * (isPositive ? -1 : 1))
        return {
          tooltip: `Variable: ${variable}<br />${value}<br />Change: ${format('.0%')(change)}<br />Region: ${region}`,
          d: calcBar(x, yBase, y, barWidth),
          x,
          y: yBase,
          color: getColorFromVariable(variable)
        }
      }))
    },
    ticks () {
      const { margin, yBase } = this
      const ticks = this.scaleY.ticks(2)
      return map(ticks.concat(ticks), (tick, i) => {
        const isPositive = i <= ticks.length
        return {
          y: yBase + (this.scaleY(tick) * (isPositive ? -1 : 1)),
          x1: margin.left,
          x2: this.width - margin.right,
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
      width: 100%;

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
