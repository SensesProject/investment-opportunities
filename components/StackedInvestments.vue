<template>
  <figure class="vis-investment-absolute">
    <svg ref="vis" class="vis" :viewBox="`0 0 ${width} ${height}`">
      <g v-if="width">
        <g v-for="(data, key) in dataByScenario" class="scenario">
          <StackedInvestmentsBars
            :width="width"
            :height="height"
            :gap="gap"
            :data="data"
            :scenario="key"
            :extents="extents"
            :y="scaleY(key)"
          />
        </g>
      </g>
      <StackedInvestmentsDefs />
    </svg>
    <Labels :data="dataByScenario" />
  </figure>
</template>

<script>
import { groupBy, filter, get, map, forEach } from 'lodash'
import { scaleBand } from 'd3-scale'
import { mapState, mapGetters } from 'vuex'
import StackedInvestmentsBars from '~/components/StackedInvestmentsBars'
import StackedInvestmentsDefs from '~/components/StackedInvestmentsDefs'
import Labels from '~/components/InvestmentAbsolute/Labels'
import { VARIABLES } from '~/store/config'

export default {
  components: {
    StackedInvestmentsBars,
    StackedInvestmentsDefs,
    Labels
  },
  data: () => {
    return {
      width: 0,
      height: 0,
      gap: 20,
      scenarios: ['historic', 'NDC', '2C', '1.5C']
    }
  },
  computed: {
    ...mapGetters([
      'data'
    ]),
    ...mapState({
      model: state => state.settings.model,
      region: state => state.settings.region
    }),
    scaleY () {
      return scaleBand()
        .range([0, this.height])
        .domain(this.scenarios)
        .paddingOuter(0)
    },
    dataByScenario () {
      console.log(this.data)
      return groupBy(this.data, 'scenario')
    },
    extents () {
      // We need the maximum value for each variable for the unstacked chart
      const maxes = {}
      forEach(VARIABLES, (variable) => {
        const runs = filter(this.data, { variable })
        // Get the average values from the runs
        const values = map(runs, run => get(run, ['values', this.region, this.model]))
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

    .vis {
      height: 100%;
      width: 100%;

      figure, svg {

      }

      svg > * {
        pointer-events: all;
      }
    }

    .vis-labels {
      pointer-events: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: grid;
      grid-template-rows: repeat(4, 1fr);
    }
  }

</style>
