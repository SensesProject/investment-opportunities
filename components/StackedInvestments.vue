<template>
  <svg ref="vis" class="vis" :viewBox="`0 0 ${width} ${width}`">
    <g v-if="width">
      <g v-for="(data, key) in dataByScenario" class="scenario">
        <StackedInvestmentsBars
          :width="width"
          :height="height"
          :gap="gap"
          :data="data"
          :scenario="key"
          :extents="extents"
          :variables="variables"
        />
        <StackedInvestmentsLabels v-if="key === 'CPol'" :gap="gap" :extents="extents" />
      </g>
    </g>
    <StackedInvestmentsDefs />
  </svg>
</template>

<script>
import { groupBy, filter, get, map, forEach } from 'lodash'
import { mapState, mapGetters } from 'vuex'
import StackedInvestmentsBars from '~/components/StackedInvestmentsBars'
import StackedInvestmentsLabels from '~/components/StackedInvestmentsLabels'
import StackedInvestmentsDefs from '~/components/StackedInvestmentsDefs'

export default {
  components: {
    StackedInvestmentsBars,
    StackedInvestmentsLabels,
    StackedInvestmentsDefs
  },
  data: () => {
    return {
      width: 0,
      height: 0,
      gap: 20,
      variables: [
        'Energy Efficiency',
        'CCS',
        'Electricity - T&D and Storage',
        'Extraction and Conversion - Nuclear',
        'Extraction and Conversion - Bioenergy',
        'Electricity - Non-bio Renewables',
        'Electricity - Fossil Fuels w/o CCS',
        'Extraction and Conversion - Fossil Fuels'
        // 'Hydrogen - Fossil',
        // 'Hydrogen - Non-fossil',
      ]
    }
  },
  computed: {
    ...mapGetters([
      'data'
    ]),
    ...mapState({
      showModels: state => state.settings.showModels,
      barStacked: state => state.settings.barStacked
    }),
    dataByScenario () {
      return groupBy(this.data, 'scenario')
    },
    extents () {
      // We need the maximum value for each variable for the unstacked chart
      const maxes = {}
      forEach(this.variables, (variable) => {
        const runs = filter(this.data, { variable })
        // Get the average values from the runs
        const values = map(runs, run => get(run, ['values', 'max'])) // TODO: Right now we are only using the average value
        // Set the max value
        maxes[variable] = Math.max(...values)
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
        console.log('here', this.width)
        this.height = this.width
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .scenario {
    margin: $spacing 0 0;
  }

  .vis {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    margin-left: 0;
    z-index: $z-index-graphics;
  }
</style>
