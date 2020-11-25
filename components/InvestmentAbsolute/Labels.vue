<template>
  <div class="vis-labels">
    <section>
      <h2>What {{ subject }} are <strong :class="{ isHighlighted }">currently</strong> investing <small>(average 2017–2019)</small></h2>
      <div class="description">
        <span :class="['label-2', { isVisible: get(values, ['historic'], 0) && !barStacked }]">As an average of the last 3 years, {{ subject }} {{ verb }} currently investing <strong>{{ get(values, ['historic', 'value'], 0) }}</strong> billion US dollar every year</span>
      </div>
    </section>
    <section>
      <h2>What {{ subject }} <strong :class="{ isHighlighted }">pledged</strong> to invest <small>(Nationally Determined Contributions)</small></h2>
      <div class="description">
        <span :class="['label-2', { isVisible: get(values, ['NDC'], 0) && !barStacked }]">Given current country plans, {{ subject }} {{ verb }} headed to invest <strong>{{ get(values, ['NDC', 'value'], 0) }}</strong> billion US dollar every year over the next decade. That is <strong>{{ get(values, ['NDC', 'diff'], 0) }}</strong>&#8239;bn {{ get(values, ['NDC', 'isPositive'], true) ? 'more' : 'less' }} than currently.</span>
      </div>
    </section>
    <section>
      <h2>What {{ subject }} <strong :class="{ isHighlighted }">should</strong> invest for <strong :class="{ isHighlighted }">2&#8239;°C</strong></h2>
      <div class="description">
        <span :class="['label-2', { isVisible: get(values, ['2C'], 0) && !barStacked }]">In order to reach the 2° target, {{ subject }} must invest <strong>{{ get(values, ['2C', 'value'], 0) }}</strong> billion US dollar every year over the next decade. That is <strong>{{ get(values, ['2C', 'diff'], 0) }}</strong>&#8239;bn {{ get(values, ['2C', 'isPositive'], true) ? 'more' : 'less' }} than currently.</span>
      </div>
    </section>
    <section>
      <h2>What {{ subject }} <strong :class="{ isHighlighted }">should</strong> invest for <strong :class="{ isHighlighted }">1.5&#8239;°C</strong></h2>
      <div class="description">
        <span :class="['label-2', { isVisible: get(values, ['1.5C'], 0) && !barStacked }]">In order to reach the 1.5° target, {{ subject }} must invest <strong>{{ get(values, ['1.5C', 'value'], 0) }}</strong> billion US dollar every year over the next decade. That is <strong>{{ get(values, ['1.5C', 'diff'], 0) }}</strong>&#8239;bn {{ get(values, ['1.5C', 'isPositive'], true) ? 'more' : 'less' }} than currently.</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { forEach, get, sumBy, round } from 'lodash'
import { getShortRegion } from '~/assets/js/utils.js'

export default {
  props: ['data'],
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked,
      showRegions: state => state.settings.showRegions,
      model: state => state.settings.model,
      region: state => state.settings.region,
      isColored: state => state.settings.isColored
    }),
    isHighlighted () {
      return !this.barStacked && !this.isColored
    },
    subject () {
      if (this.showRegions) {
        return 'the regions'
      } else {
        if (this.region === 'World') {
          return 'we'
        } else {
          return getShortRegion(this.region)
        }
      }
    },
    verb () {
      if (this.showRegions) {
        return 'are'
      } else {
        if (this.region === 'World') {
          return 'are'
        } else {
          return 'is'
        }
      }
    },
    values () {
      const DECIMALS = 0
      const datum = {}

      forEach(this.data, (values, scenario) => {
        datum[scenario] = {
          value: round(sumBy(values, value => get(value, ['values', this.region, this.model], 0)), DECIMALS)
        }
      })

      forEach(datum, (value, scenario) => {
        datum[scenario].diff = round(get(datum, [scenario, 'value'], 0) - get(datum, ['historic', 'value'], 0), DECIMALS)
        datum[scenario].isPositive = datum[scenario].diff > 0
        datum[scenario].diff = Math.abs(datum[scenario].diff)
      })

      return datum
    },
    regionLabel () {
      return this.region === 'World' ? 'we' : this.region
    }
  },
  methods: {
    get
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  h2 {
    line-height: 1;

    small {
      display: none;

      @include query($medium) {
        display: inline-block;
      }
    }
  }

  .description {
    display: none;
    height: calc(1.05rem * 2.0);
    align-items: center;

    @include query($medium) {
      display: flex;
    }
  }

  .label-2 {
    line-height: 1.2;
    opacity: 0;
    transition: opacity $transition-animation $transition-type 0s;

    &.isVisible {
      opacity: 1;
      transition: opacity $transition-animation $transition-type $transition-animation * 2;
    }
  }

</style>
