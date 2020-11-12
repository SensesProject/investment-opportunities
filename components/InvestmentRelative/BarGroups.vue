<template>
  <g class="barGroups-wrapper">
    <g class="barGroup-wrapper" v-for="bar in barGroups">
      <text
        class="barGroup--label"
        :class="{ isVisible: !showModels && barStacked }"
        :x="bar.x"
        :y="bar.y - 2">{{ bar.label }}</text>
      <rect
        class="barGroup"
        :class="{ isVisible: !showModels && barStacked }"
        :x="bar.x"
        :y="bar.y"
        :width="bar.width"
        :height="bar.height" />
      </g>
  </g>
</template>

<script>
import { get, map, sumBy } from 'lodash'
import { mapState } from 'vuex'
import { GROUP_FOSSILS, GROUP_NON_FOSSILS, GROUP_OTHERS, GROUP_LABELS } from '~/store/config'
// import { MODELS } from '~/store/config'

export default {
  props: ['data', 'scenario', 'width', 'height', 'y', 'scaleX', 'groupHeight', 'extents', 'gap'],
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked,
      isColored: state => state.settings.isColored,
      showModels: state => state.settings.showModels,
      highlight: state => state.settings.highlight
    }),
    barGroups () {
      let x0 = 0

      return map([GROUP_FOSSILS, GROUP_NON_FOSSILS, GROUP_OTHERS], (variables, i) => {
        const sumMax = sumBy(variables, (variable) => {
          return get(this.extents, variable, 0)
        })

        // const reference = get(d, ['reference', 'average'], 0)
        // const [change, isPositiveChange] = get(d, ['changes', 'average'], [])

        // const color = this.isColored ? getColorFromVariable(variable) : '#343437'

        // const tooltip = this.createVariableTooltip(variable, value, reference, change, isPositiveChange)

        const maxWidth = this.scaleX(sumMax) + this.gap * variables.length

        // width to be stacked
        const x1 = maxWidth
        x0 += x1

        return {
          label: GROUP_LABELS[i],
          x: x0 - x1,
          y: this.y - 10,
          width: maxWidth - this.gap,
          height: 1
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/global";

  .barGroup {
    fill: #d7d7d7;
  }

  .barGroup--label {
    @include graphic-text-label();
  }

  .barGroup, .barGroup--label {
    opacity: 0;
    transition: opacity $transition-animation linear 0;

    &.isVisible {
      opacity: 1;
      transition: opacity $transition-animation linear $transition-animation * 2;
    }
  }
</style>
