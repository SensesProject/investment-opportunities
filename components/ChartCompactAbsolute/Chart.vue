<template>
  <figure>
    <header>
      <h4><slot name="header"></slot></h4>
    </header>
    <div class="bars">
      <svg ref="vis" class="vis">
        <defs>
          <linearGradient
            v-for="({ variable, color, id }) in gradients"
            :id="id"
            :key="id"
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            y1="0"
            :y2="maxHeight">
            <stop offset="0.05" :stop-color="color" stop-opacity="0" />
            <stop offset="0.15" :stop-color="color" stop-opacity="1" />
          </linearGradient>
        </defs>
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
            :fill="`url(#gradient-${el.variable})`"
          />
          <text
            v-if="el.label"
            class="label"
            text-anchor="middle"
            :x="el.x + barWidth / 2"
            :y="el.y + el.offset"
            :dominant-baseline="el.baseline">
            {{ el.label }}
          </text>
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
import { map, find, isUndefined, compact, range, get, forEach, kebabCase } from 'lodash'
import { mapState, mapGetters } from 'vuex'
import { format } from 'd3-format'
import { getColorFromVariable, calcBar, shortScenario, createTooltip } from '~/assets/js/utils.js'

export default {
  props: {
    variables: {
      type: Array,
      default: () => []
    },
    scenarios: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 2
    }
  },
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
      isColored: state => state.settings.isColored,
      model: state => state.settings.model
    }),
    ...mapGetters([
      'data'
    ]),
    extentX () {
      return Math.max(...map(this.options, (option, i) => {
        // const datum = get(find(this.data, option), ['values', this.region, this.model], 0)
        // const ref = get(find(this.data, option), ['reference', this.region, this.model], 0)
        const diff = get(find(this.data, option), ['changes', this.region, this.model, 2], 0)
        // console.log(option.variable, { datum, ref, diff })
        return Math.abs(diff)
      }))
    },
    scaleY () {
      return scaleLinear()
        .range([0, this.height / 2 - this.margin.top])
        .domain([0, this.extentX]).nice()
    },
    maxHeight () {
      return this.scaleY.range()[1] + 15
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
    gradients () {
      return map(this.variables, (variable) => {
        const key = kebabCase(variable)
        return {
          variable: key,
          color: getColorFromVariable(variable),
          id: `gradient-${key}`
        }
      })
    },
    elements () {
      const { yBase, barWidth, options, data } = this

      return compact(map(options, (option, i) => {
        const datum = find(data, option)
        if (!datum) { return false }
        const { variable, scenario } = datum
        const [change, isPositive, value] = get(datum, ['changes', this.region, this.model], [0, true, 0])
        const absValue = get(datum, ['values', this.region, this.model], 0)
        const reference = get(datum, ['reference', this.region, this.model], 0)
        const x = this.scaleX(i)
        const y = yBase + (Math.min(this.scaleY(Math.abs(value)), this.maxHeight) * (isPositive ? -1 : 1))
        return {
          tooltip: createTooltip('change', this.region, variable, absValue, reference, change, isPositive, scenario, this.model),
          d: calcBar(x, yBase, y, barWidth),
          x,
          y,
          variable: kebabCase(variable),
          offset: 4 * (isPositive ? -1 : 1),
          label: i < this.scenarios.length ? shortScenario(scenario) : false,
          baseline: isPositive ? 'auto' : 'hanging'
        }
      }))
    },
    ticks () {
      const { margin, yBase } = this
      const ticks = this.scaleY.ticks(3)
      return map(ticks.concat(ticks), (tick, i) => {
        const isPositive = i <= ticks.length
        return {
          y: yBase + (this.scaleY(tick) * (isPositive ? -1 : 1)),
          x1: margin.left,
          x2: this.width - margin.right,
          label: `${isPositive ? '' : '–'}${tick}`
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

      .label {
        @include graphic-text-label-2();
      }

      .tick {
        font-size: $font-size-small;
        fill: getColor(gray, 60);
        font-family: $font-sans;
      }
    }
  }

</style>
