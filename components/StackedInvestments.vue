<template>
  <figure class="vis-investment-absolute">
    <svg ref="vis" class="vis" :viewBox="`0 0 ${width} ${height}`">
      <g v-if="width">
        <Guides :height="height" />
        <g v-for="(data, key) in dataByScenario" class="scenario">
          <StackedInvestmentsBars
            :width="width"
            :height="height"
            :gap="gap"
            :data="data"
            :scenario="key"
            :extents="extents"
            :y="scaleY(key)"
            :scenarioHeight="scenarioHeight"
          />
        </g>
      </g>
      <StackedInvestmentsDefs />
    </svg>
    <Labels :data="dataByScenario" />
  </figure>
</template>

<script>
import { groupBy, filter, get, map, forEach, max } from 'lodash'
import { scaleBand, scaleLinear } from 'd3-scale'
import { mapState, mapGetters } from 'vuex'
import StackedInvestmentsBars from '~/components/StackedInvestmentsBars'
import StackedInvestmentsDefs from '~/components/StackedInvestmentsDefs'
import Labels from '~/components/InvestmentAbsolute/Labels'
import Guides from '~/components/Guides'
import { VARIABLES, REGIONS } from '~/store/config'

export default {
  components: {
    StackedInvestmentsBars,
    StackedInvestmentsDefs,
    Labels,
    Guides
  },
  data: () => {
    return {
      width: 0,
      height: 0,
      scenarios: ['historic', 'NDC', '2C', '1.5C']
    }
  },
  computed: {
    ...mapGetters([
      'data'
    ]),
    ...mapState({
      model: state => state.settings.model,
      region: state => state.settings.region,
      showRegions: state => state.settings.showRegions
    }),
    scaleGap () {
      return scaleLinear()
        .range([5, 20])
        .domain([300 / VARIABLES.length, 1400 / VARIABLES.length])
    },
    gap () {
      return Math.max(Math.min(this.scaleGap(this.width / VARIABLES.length) * (this.showRegions ? 0.5 : 1), 30), 3)
    },
    scaleY () {
      return scaleBand()
        .range([0, this.height])
        .domain(this.scenarios)
        .paddingOuter(0)
    },
    scenarioHeight () {
      return this.scaleY.bandwidth()
    },
    dataByScenario () {
      return groupBy(this.data, 'scenario')
    },
    extents () {
      // We need the maximum value for each variable for the unstacked chart
      const maxes = {}
      forEach(VARIABLES, (variable) => {
        const runs = filter(this.data, { variable })
        // Get the average values from the runs
        const values = map(runs, (run) => {
          if (this.showRegions) {
            const regions = map(REGIONS, region => get(run, ['values', region, this.model]))
            return max(regions)
          } else {
            return get(run, ['values', 'World', this.model])
          }
        })
        // Set the max value
        maxes[variable] = Math.max(...values, 0)
      })
      return maxes
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

<style lang="scss">
  @import "~@/assets/style/global";

  .vis-investment-absolute {
    position: relative;
    padding: 0;
    margin: 0;
    height: 70vh;
    width: 100%;

    .vis {
      height: 100%;
      width: 100%;

      svg > * {
        pointer-events: all;
      }
    }

    .vis-labels {
      pointer-events: none;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-rows: repeat(4, 1fr);
    }
  }

</style>
