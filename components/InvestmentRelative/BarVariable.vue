<template>
  <g class="barVariables-wrapper">
    <g class="barVariable-wrapper" v-for="bar in barVariables">
      <rect
        class="barVariable"
        :class="{ isVisible: !showModels && isColored, hasHighlight: highlight.length, isHighlighted: highlight.includes(bar.variable) }"
        :x="bar.x"
        :y="bar.y"
        :width="bar.width"
        :height="bar.height"
        :fill="bar.color"
        v-tooltip="{ content: bar.tooltip }" />
      </g>
  </g>
</template>

<script>
import { format } from 'd3-format'
import { get, find, map } from 'lodash'
import { mapState } from 'vuex'
import { getColorFromVariable } from '~/assets/js/utils.js'
// import { MODELS } from '~/store/config'

export default {
  props: ['data', 'scenario', 'variables', 'width', 'height', 'y', 'scaleX', 'groupHeight', 'extents', 'gap'],
  data: () => {
    return {
      headlineHeight: 50
    }
  },
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked,
      isColored: state => state.settings.isColored,
      showModels: state => state.settings.showModels,
      highlight: state => state.settings.highlight
    }),
    barVariables () {
      let x0 = 0

      return map(this.variables, (variable) => {
        const d = find(this.data, { variable })
        const value = get(d, ['values', 'average'], 0)

        const reference = get(d, ['reference', 'average'], 0)
        const [change, isPositiveChange] = get(d, ['changes', 'average'], [])

        const color = this.isColored ? getColorFromVariable(variable) : '#343437'

        const tooltip = this.createVariableTooltip(variable, value, reference, change, isPositiveChange)

        const width = this.scaleX(value)
        const maxWidth = this.scaleX(get(this.extents, variable, value)) + this.gap

        // width to be stacked
        const x1 = this.barStacked ? maxWidth : width
        x0 += x1

        return {
          x: x0 - x1,
          y: this.y,
          width,
          height: this.groupHeight / 2,
          tooltip,
          color,
          variable
        }
      })
    }
  },
  methods: {
    createVariableTooltip (variable, value, reference, change, isPositive) {
      const { formatNumber: fN } = this
      return `
        <header>${variable}</header>
        <p>
          We are currently investing <strong>${fN(reference)}</strong> Billion US-Dollar per year,<br />
          but we ${this.scenario === 'NDC' ? 'pledged to' : 'should'} invest <strong>${fN(value)}</strong>.
          That means, we should invest<br />
          <strong>${fN(Math.abs(value - reference))} (${change}) ${isPositive ? 'more' : 'less'}</strong> in ${variable}.
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

  .barVariable {
    transition: x $transition-animation linear 0s, fill $transition-animation, opacity $transition-animation;

    &.isVisible {
      transition: x $transition-animation linear $transition-animation, fill $transition-animation, opacity $transition-animation;
    }

    &.hasHighlight {
      opacity: 0.2;

      &.isHighlighted {
        opacity: 1;
        filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, .1));
      }
    }
  }
</style>
