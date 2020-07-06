<template>
  <div class="vis">
    <div class="wrapper">
      <div v-for="(scenario, key) in relativeValues" class="scenario">
        <BarInvestmentsChart
          :gap="gap"
          :data="scenario"
          :scenario="key"
          :variables="variables"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { map, groupBy, fromPairs, compact, get } from 'lodash'
// import { extent } from 'd3-array'
import { mapState, mapGetters } from 'vuex'
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
      'data'
    ]),
    ...mapState({
      model: state => state.settings.model
    }),
    dataByScenario () {
      return groupBy(this.data, 'scenario')
    },
    relativeValues () {
      // console.log(this.dataByScenario)
      return fromPairs(compact(map(this.dataByScenario, (scenario, key) => {
        if (key === 'CPol') { return false }
        const rel = map(scenario, ({ model, region, variable, value, changes }) => {
          // console.log(changes)
          const [change, isPositive] = get(changes, this.model, [0, false])
          // const reference = get(find(this.reference, { model, region, variable }), 'value')
          // const change = Math.abs(reference - value) / Math.max(reference, value)
          // const isPositive = reference > value
          // console.log({ variable, key, reference, value, change })
          return {
            model,
            region,
            variable,
            value,
            change,
            isPositive
          }
        })
        return [key, rel]
      })))
    }
    // extents () {
    //   return extent(compact(flatten(map(this.relativeValues, scenario => map(scenario, ({ change }) => isNaN(change) || change === Infinity ? 1 : change)))))
    // }
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
