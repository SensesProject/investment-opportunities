<template>
  <section class="section vis">
    <div v-for="(scenario, key) in dataByScenario" class="scenario">
      <StackedInvestmentsBars
        :gap="gap"
        :data="scenario"
        :scenario="key"
        :extents="extents"
        :variables="variables"
      />
      <StackedInvestmentsLabels v-if="key === 'CPol'" :gap="gap" :extents="extents" />
    </div>
  </section>
</template>

<script>
import { groupBy, filter, get, map, forEach } from 'lodash'
import { mapState, mapGetters } from 'vuex'
import StackedInvestmentsBars from '~/components/StackedInvestmentsBars'
import StackedInvestmentsLabels from '~/components/StackedInvestmentsLabels'

export default {
  data: () => {
    return {
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
  components: {
    StackedInvestmentsBars,
    StackedInvestmentsLabels
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .scenario {
    margin: $spacing 0 0;
  }

</style>
