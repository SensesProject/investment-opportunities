<template>
  <div class="vis">
    <svg ref="vis" :style="{ 'width': dimension, 'height': dimension}">
      <g
        v-for="(e, i) in elements"
        :key="e.key"
        :class="`color${i}`"
        :style="{ transform: `translateY(${e.y0}px)` }"
      >
        <line
          :x1="e.x1"
          :x2="e.x2"
          :y1="e.y1"
          :y2="e.y2"
        />
        <circle
          :cx="e.x1"
          :cy="e.y1"
          :r="3"
        />
        <circle
          :cx="e.x2"
          :cy="e.y2"
          :r="3"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleLinear } from 'd3-scale'
import { map, head, last, sum, flatten, get } from 'lodash'
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
    dimension () {
      return Math.min(this.width, this.height)
    },
    sumFirstYear () {
      return sum(flatten(map(this.data, (runs) => {
        return get(head(get(runs, 'years', [])), '1')
      })))
    },
    sumLastYear () {
      return sum(flatten(map(this.data, (runs) => {
        return get(last(get(runs, 'years', [])), '1')
      })))
    },
    scaleX () {
      return scaleLinear()
        .range([this.margin.left, this.dimension - this.margin.right])
        .domain(this.rangeValues).nice()
    },
    scaleY () {
      return scaleLinear()
        .range([this.dimension - this.margin.bottom, this.margin.top])
        .domain([0, 0.6])
    },
    elements () {
      return map(this.data, (run, i) => {
        const { key, years } = run
        const start = head(years)
        const end = last(years)
        const x1 = this.scaleX(start[1])
        const x2 = this.scaleX(end[1])
        const y1 = this.scaleY(1 / this.sumFirstYear * start[1])
        const y2 = this.scaleY(1 / this.sumLastYear * end[1])

        return {
          key,
          x1,
          x2,
          y1,
          y2
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
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;

      line {
        stroke-width: 2px;
      }
    }
  }

</style>
