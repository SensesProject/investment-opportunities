<template>
  <g class="barScenario-wrapper">
    <rect
      class="barScenario"
      :class="{ isVisible: !isColored && !barStacked }"
      :x="barScenario.x"
      :y="barScenario.y"
      :width="barScenario.width"
      :height="barScenario.height"
      v-tooltip="{ content: barScenario.tooltip }"
      @mouseenter="() => changeGuides([barScenario.x, barScenario.x + barScenario.width])"
      @mouseleave="() => changeGuides([])" />
  </g>
</template>

<script>
import { format } from 'd3-format'
import { get, sumBy, find } from 'lodash'
import { mapState, mapActions } from 'vuex'
import { VARIABLES } from '~/store/config'

export default {
  props: ['data', 'scenario', 'width', 'height', 'y', 'scaleX', 'groupHeight'],
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked,
      isColored: state => state.settings.isColored,
      model: state => state.settings.model,
      region: state => state.settings.region
    }),
    barScenario () {
      const sum = sumBy(VARIABLES, (variable) => {
        const d = find(this.data, { variable })
        return get(d, ['values', this.region, this.model], 0)
      })
      const sumRef = sumBy(VARIABLES, (variable) => {
        const d = find(this.data, { variable })
        return get(d, ['reference', this.region, this.model], 0)
      })
      const tooltip = this.createScenarioTooltip(this.scenario, sum, sumRef, sum - sumRef)
      return {
        x: 0,
        y: this.y,
        width: this.scaleX(sum),
        height: this.groupHeight / 2,
        tooltip
      }
    }
  },
  methods: {
    ...mapActions('guides', [
      'changeGuides'
    ]),
    createScenarioTooltip (scenario, value, reference, diff) {
      const { formatNumber: fN } = this
      return `
        <header>${scenario}</header>
        <p>
          We are currently investing <strong>${fN(reference)}</strong> Billion US-Dollar per year,<br />
          but we should invest <strong>${fN(value)}</strong>.
          That means, we should invest<br />
          <strong>${fN(Math.abs(diff))} ${diff > 0 ? 'more' : 'less'}</strong> in ${scenario}.
        </p>
      `
    },
    formatNumber (n) {
      return format(',.3r')(n)
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/global";

  .barScenario {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0s;
    fill: getColor(gray, 10);
    // stroke: #000;
    // stroke-width: 1.5;

    &.isVisible {
      opacity: 1;
      pointer-events: all;
      transition: opacity 0s linear $transition-animation;
    }
  }

  .guide {
    stroke: #d7d7d7;
  }
</style>