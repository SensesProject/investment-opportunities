<template>
  <div class="bars">
    <span class="label" v-html="label" />
    <div class="intro">
      <span v-if="scenario === 'CPol'">{{ region }} is currently investing <strong>{{ sumThisLabel }}</strong> Billion US-Dollar per year.</span>
      <span v-else>In total, <strong>{{ diffLabel }}</strong> Billion US-Dollar <strong>{{ diff > 0 ? 'more' : 'less' }}</strong> per year</span>
    </div>
    <svg ref="vis" class="vis">
      <g v-for="variable in elements" v-if="width">
        <g v-for="el in variable" v-tooltip="el.tooltip" :key="el.key">
          <rect
            :x="el.x"
            :width="el.width"
            :height="el.height"
            :class="[el.key, el.label]"
            :y="el.y"
            :style="{ fill: el.color }"
          />
          <g v-if="el.marker !== el.width" :class="{ 'difference': true, 'showDifference': barDifference }">
            <g v-if="el.marker < el.width">
              <rect
                :x="el.x"
                :width="el.marker"
                :height="height"
                :y="el.y"
                :style="{ fill: 'rgba(255, 255, 255, 0.8)' }"
              />
              <line
                :x1="el.x + el.marker"
                :x2="el.x + el.marker"
                :y1="el.y"
                :y2="height"
                class="more"
              />
            </g>
            <g v-else>
              <rect
                :x="el.x"
                :width="el.width"
                :height="el.height"
                :y="el.y"
                :style="{ fill: 'rgba(255, 255, 255, 0.8)' }"
              />
              <rect
                v-if="el.marker > el.width"
                :x="el.x + el.width"
                :width="el.marker - el.width"
                :height="el.height"
                :style="{ fill: el.color }"
                :y="el.y"
              />
              <rect
                v-if="el.marker > el.width"
                :x="el.x + el.width"
                :width="el.marker - el.width"
                :height="el.height"
                :y="el.y"
                :style="{ fill: 'url(#diagonal-stripe-more)' }"
              />
              <line
                v-if="barDifference"
                :x1="el.x + el.width"
                :x2="el.x + el.width"
                :y1="el.y"
                :y2="height"
                class="more"
              />
            </g>
          </g>
          <text
            ref="labels"
            :x="0"
            :style="`transform: translateX(${el.x}px)`"
            :y="el.y + el.height / 2"
            dominant-baseline="hanging"
            class="label"
          >{{ barDifference ? el.diff : formatNumber(el.value) }}</text>
        </g>
      </g>
      <defs>
        <pattern id="diagonal-stripe-more" patternUnits="userSpaceOnUse" width="4" height="4">
          <path
              d="M-1,1 l2,-2
                M0,4 l4,-4
                M3,5 l2,-2"
              stroke="#fff"
              style="opacity: 0.8"
              stroke-width="1.5"
            />
        </pattern>
        <pattern id="diagonal-stripe-less" patternUnits="userSpaceOnUse" width="10" height="10">
          <path
            d="M-1,1 l2,-2
                   M0,10 l10,-10
                   M9,11 l2,-2"
            stroke="#fff"
            style="opacity: 0.9"
            stroke-width="4"
          />
        </pattern>
      </defs>
    </svg>
  </div>
</template>

<script>
import { scaleLinear, scaleBand } from 'd3-scale'
import { format } from 'd3-format'
import { map, sum, values, filter, get, forEach, compact } from 'lodash'
import { mapState } from 'vuex'

export default {
  props: ['data', 'scenario', 'extents', 'variables', 'gap'],
  data: () => {
    return {
      colors: ['#aaa', '#feeda1', '#fdbf6f', '#e9f6a1', '#b7e075', '#229c53', '#da372a', '#a50026'],
      width: 0,
      height: 100,
      margin: {
        left: 0,
        right: 0,
        top: 70,
        bottom: 10
      },
      models: ['average', 'POLES', 'REMIND-MAgPIE', 'AIM/CGE', 'IMAGE', 'MESSAGEix-GLOBIOM']
    }
  },
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked,
      barDifference: state => state.settings.barDifference,
      showModels: state => state.settings.showModels,
      region: state => state.settings.region
    }),
    total () {
      return sum(values(this.extents))
    },
    label () {
      const pronom = this.region === 'World' ? 'we' : this.region
      const labels = {
        CPol: `What ${pronom} ${this.region === 'World' ? 'are' : 'is'} <strong>currently</strong> investing <small>(Current policies)</small>`,
        NDC: `What ${pronom} <strong>pledged</strong> to invest <small>(Nationally Determined Contributions)</small>`,
        '2C': `What ${pronom} <strong>should</strong> invest for <strong>2°C</strong>`,
        '1.5C': `What ${pronom} <strong>should</strong> invest for <strong>1.5°C</strong>`
      }
      return get(labels, this.scenario, this.scenario)
    },
    scaleX () {
      return scaleLinear()
        .range([this.margin.left, this.width - (this.variables.length - 1) * this.gap - this.margin.right])
        .domain([0, this.total])
    },
    scaleY () {
      return scaleBand()
        .range([0, this.height])
        .domain(this.models)
    },
    widths () {
      return map(this.elements, (d) => { return get(d, 'x1', 0) - this.gap })
    },
    gaps () {
      return (this.elements.length - 1) * this.gap
    },
    sumThis () {
      return sum(map(this.elements, 'value'))
    },
    sumThisLabel () {
      return this.formatNumber(this.sumThis)
    },
    sumReference () {
      return sum(map(this.elements, 'reference'))
    },
    diff () {
      return this.sumThis - this.sumReference
    },
    diffLabel () {
      return this.formatNumber(Math.abs(this.diff))
    },
    elements () {
      let x0 = 0
      return map(this.variables, (variable, i) => {
        const color = get(this.colors, i, '#222')
        const data = get(filter(this.data, { variable }), 0)

        const values = get(data, ['values'], {})
        const references = get(data, ['reference'], {})

        const average = get(values, 'average', 0)
        const referenceAverage = get(references, 'average', 0)

        let n = 0

        const bars = compact(map(values, (value, key) => {
          const reference = get(references, key, 0)

          // const x = this.scaleX(value)
          const y = this.showModels ? this.scaleY(key) : this.scaleY(key) - this.scaleY.bandwidth() / 2 * n

          const x1 = this.barStacked ? this.scaleX(get(this.extents, variable, value)) + this.gap : this.scaleX(value)
          const width = this.scaleX(this.showModels ? value : average)
          const marker = this.scaleX(this.showModels ? reference : referenceAverage)
          const diff = value - reference
          const tooltip = this.createTooltip(variable, value, reference, diff)
          const height = this.showModels ? this.scaleY.bandwidth() / 2 : this.scaleY.bandwidth() / 2 + 1
          if (key === 'max') {
            return false
          }
          n++
          return {
            key,
            x: x0,
            y,
            label: variable,
            diff: (diff > 0 ? '+' : '') + this.formatNumber(diff).replace('-', '–'),
            x0,
            x1,
            width,
            value,
            height,
            reference,
            color,
            marker,
            tooltip
          }
        }))

        const maxValue = get(values, this.barStacked ? 'max' : 'average')
        x0 += this.barStacked ? this.scaleX(get(this.extents, variable, maxValue)) + this.gap : this.scaleX(maxValue)

        return bars
      })
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  updated () {
    forEach(this.$refs.labels, (label, i) => {
      const { width } = label.getBBox()
      label.style.opacity = width < this.widths[i] ? 1 : 0
    })
    this.calcSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  },
  methods: {
    createTooltip (variable, value, reference, diff) {
      const { formatNumber: fN } = this
      return `
        <header>${variable}</header>
        <p>
          We are currently investing <strong>${fN(reference)}</strong> Billion US-Dollar per year,<br />
          but we should invest <strong>${fN(value)}</strong>.
          That means, we should invest<br />
          <strong>${fN(Math.abs(diff))} ${diff > 0 ? 'more' : 'less'}</strong> in ${variable}.
        </p>
      `
    },
    formatNumber (n) {
      return format(',.3r')(n)
    },
    calcSizes () {
      const { vis: el } = this.$refs
      if (el !== 'undefined') {
        this.width = el.clientWidth || el.parentNode.clientWidth
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/global";

  .bars {
    .label {
      margin-bottom: $spacing / 8;
      display: block;
      font-size: $font-size-bigger;
      font-weight: $font-weight-regular;
      font-family: $font-serif;

      small {
        font-size: $font-size-default;
        color: getColor(gray, 60);
      }

      strong {
        font-weight: $font-weight-bold;
        font-family: $font-sans;
      }
    }

    .intro {
      font-size: $font-size-default;
      margin-bottom: $spacing / 2;
      display: block;
      color: getColor(gray, 40);
    }

    .vis {
      width: 100%;
      height: calc(100px + 5px + #{$font-size-small});

      rect, text {
        transition: opacity $transition-animation, width $transition-animation, height $transition-animation, y $transition-animation, x $transition-animation;
      }

      line {
        transition: opacity $transition-animation, x1 $transition-animation, x2 $transition-animation, y1 $transition-animation, y2 $transition-animation;
      }

      line {
        &.more {
          stroke: #fff;
          stroke-width: 2px;
          stroke-dasharray: 1px, 1px;
        }
      }

      .difference {
        rect, line {
          opacity: 0;
        }

        &.showDifference {
          rect, line {
            opacity: 1;
          }
        }
      }

      .label {
        font-size: $font-size-small;
        fill: getColor(gray, 60);
        font-family: $font-sans;
      }
    }

    .labels {
      display: grid;
      font-size: $font-size-small;
      color: getColor(gray, 60);
    }
  }

</style>
