<template>
  <div class="vis">
    <div class="wrapper">
      <div v-for="(scenario, key) in dataByScenario" class="scenario">
        <StackedInvestmentsBars
          :gap="gap"
          :data="scenario"
          :scenario="key"
          :extents="extents"
          :variables="variables"
          :reference="reference"
        />
        <StackedInvestmentsLabels v-if="key === 'CPol'" :gap="gap" :extents="extents" />
      </div>
    </div>
  </div>
</template>

<script>
import { map, groupBy, filter, maxBy, get, fromPairs } from 'lodash'
import { mapGetters } from 'vuex'
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
    dataByScenario () {
      return groupBy(this.data, 'scenario')
    },
    reference () {
      return get(this.dataByScenario, 'CPol')
    },
    extents () {
      return fromPairs(map(this.variables, (variable) => {
        const runs = filter(this.data, { variable })
        return [variable, get(maxBy(runs, 'value'), 'value')]
      }))
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

  .vis {
    @include center();

    .wrapper {
      max-width: 1200px;
    }
  }

  .scenario {
    margin: 0 0 $spacing * 2;
  }

</style>
