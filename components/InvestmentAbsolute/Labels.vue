<template>
  <div class="vis-labels">
    <section>
      <h2>What we are <strong :class="{ isHighlighted: !barStacked }">currently</strong> investing <small>(Current policies) {{ model }}</small></h2>
      <span class="label-2" v-if="get(values, ['historic'], 0) && !barStacked">As of 2020, we are investing <strong>{{ get(values, ['historic', 'value'], 0) }}</strong> billion US dollar every year</span>
    </section>
    <section>
      <h2>What we <strong :class="{ isHighlighted: !barStacked }">pledged</strong> to invest <small>(Nationally Determined Contributions)</small></h2>
      <span class="label-2" v-if="get(values, ['NDC'], 0) && !barStacked">As of 2020, we are investing <strong>{{ get(values, ['NDC', 'value'], 0) }}</strong> billion US dollar every year</span>
    </section>
    <section>
      <h2>What we <strong :class="{ isHighlighted: !barStacked }">should</strong> invest for <strong :class="{ isHighlighted: !barStacked }">2°C</strong></h2>
      <span class="label-2" v-if="get(values, ['2C'], 0) && !barStacked">In order to reach the 2° target we must invest <strong>{{ get(values, ['2C', 'value'], 0) }}</strong> billion US dollar every year. That is <strong>{{ get(values, ['2C', 'diff'], 0) }}</strong> more.</span>
    </section>
    <section>
      <h2>What we <strong :class="{ isHighlighted: !barStacked }">should</strong> invest for <strong :class="{ isHighlighted: !barStacked }">1.5°C</strong></h2>
      <span class="label-2" v-if="get(values, ['1.5C'], 0) && !barStacked">In order to reach the 1.5° target we must invest <strong>{{ get(values, ['1.5C', 'value'], 0) }}</strong> billion US dollar every year. That is <strong>{{ get(values, ['1.5C', 'value'], 0) }}</strong> more.</span>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { forEach, get, sumBy, round } from 'lodash'

export default {
  props: ['data'],
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked,
      model: state => state.settings.model
    }),
    values () {
      const DECIMALS = 2
      const datum = {}

      forEach(this.data, (values, scenario) => {
        datum[scenario] = {
          value: round(sumBy(values, value => get(value, ['values', this.model], 0)), DECIMALS)
        }
      })

      forEach(datum, (value, scenario) => {
        datum[scenario].diff = round(get(datum, [scenario, 'value'], 0) - get(datum, ['historic', 'value'], 0), DECIMALS)
      })

      return datum
    }
  },
  methods: {
    get
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

</style>
