<template>
  <div class="vis">
    <div class="wrapper">
      <div v-for="(scenario, key) in relativeValuesByScenario" class="scenario">
        <BarInvestmentsChart
          :gap="gap"
          :data="scenario"
          :scenario="key"
          :options="options"
          path="variable"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { map } from 'lodash'
import BarInvestmentsChart from '~/components/BarInvestmentsChart'

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
      'relativeValuesByScenario'
    ]),
    options () {
      return map(this.variables, (variable) => {
        return { variable }
      })
    }
  },
  components: {
    BarInvestmentsChart
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .vis {
    @include center();

    .wrapper {
      max-width: 1200px;
      display: grid;
      grid-column-gap: $spacing * 2;
      grid-auto-flow: column;
    }
  }
</style>
