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
        <circle
          v-for="b in e.bars"
          :key="b.key"
          :cx="b.x"
          :cy="0"
          :r="b.height"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { scalePow, scaleTime, scaleBand } from 'd3-scale'
import { range } from 'd3-array'
import { map } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      width: 0,
      height: 0,
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
        .domain(this.rangeTime).nice()
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
      return scalePow()
        .range([0, this.scaleY0.bandwidth()])
        .domain(this.rangeValues)
    },
    elements () {
      return map(this.data, (run, i) => {
        const { key, years } = run
        const bars = map(years, (datum) => {
          const [year, value] = datum
          const height = this.scaleY1(value)
          return {
            key: year,
            x: this.scaleX(new Date(year, 0, 1)),
            height,
            y: height / 2
          }
        })
        return {
          key,
          y0: this.scaleY0(i),
          bars
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
        stroke: #eee;
      }

      circle {
        opacity: 0.8;
      }
    }
  }

</style>
