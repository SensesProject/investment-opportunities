<template>
  <div class="vis">
    
    <svg ref="vis">
      <g
        v-for="(e, i) in elements"
        :key="e.key"
        :class="`color${i}`"
        :style="{ transform: `translateY(${e.y0}px)` }"
      >
        <line
          :x1="margin.left"
          :x2="width - margin.right"
          :y1="0"
          :y2="0"
        />
        <path
          :d="e.area"
        />
        <rect
          v-for="b in e.bars"
          :key="b.key"
          :x="b.x - barWidth / 2"
          :y="b.y"
          :height="b.height"
          :width="barWidth"
        />
        <text
          class="h4 uppercase"
          :x="e.labelX"
          :y="e.labelY"
        >
          {{ e.label }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale'
import { range } from 'd3-array'
import { area, curveCardinal } from 'd3-shape'
import { map } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      width: 0,
      height: 0,
      barWidth: 5,
      margin: {
        left: 80,
        right: 150,
        top: 70,
        bottom: 10
      }
    }
  },
  computed: {
    ...mapGetters([
      'data',
      'rangeValues',
      'rangeTime'
    ]),
    scaleX () {
      return scaleTime()
        .range([this.margin.left, this.width - this.margin.right])
        .domain(this.rangeTime)
    },
    rows () {
      return range(0, this.data.length)
    },
    scaleY0 () {
      return scaleBand()
        .range([this.height - this.margin.bottom, this.margin.top])
        .domain(this.rows)
    },
    scaleY1 () {
      return scaleLinear()
        .range([0, this.scaleY0.bandwidth()])
        .domain(this.rangeValues)
    },
    elements () {
      return map(this.data, (run, i) => {
        const { key, years, variable } = run
        const labelX = this.scaleX.range()[0]
        const labelY = -this.scaleY1.range()[1] / 3
        const bars = map(years, (datum) => {
          const [year, value] = datum
          const height = this.scaleY1(value)
          const y = height / 2
          return {
            key: year,
            x: this.scaleX(new Date(year, 0, 1)),
            height,
            y: -y,
            y0: -y,
            y1: -y + height
          }
        })
        const area = this.drawArea()(bars)

        return {
          key,
          label: variable,
          labelX,
          labelY,
          y0: this.scaleY0(i),
          bars,
          area
        }
      })
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  updated () {
    this.calcSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  },
  methods: {
    calcSizes () {
      const { vis: el } = this.$refs
      if (el !== 'undefined') {
        this.width = el.clientWidth || el.parentNode.clientWidth
        this.height = el.clientHeight || el.parentNode.clientHeight
      }
    },
    drawArea () {
      return area()
        .curve(curveCardinal)
        .x((d) => {
          return d.x
        })
        .y1((d) => {
          return d.y1
        })
        .y0((d) => {
          return d.y0
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .vis {
    min-height: 100%;

    svg {
      width: 100%;
      height: 100%;

      line {
        stroke: #eee !important;
        fill: none !important;
      }
    }
  }
</style>
