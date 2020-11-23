<template>
  <g class="barGroups-wrapper">
    <g class="barGroup-wrapper" v-for="bar in barGroups" :transform="`translate(${bar.x} 0)`">
      <text
        class="barGroup--label"
        :class="{ isVisible: !showRegions && barStacked, hasHighlight: bar.hasHighlight, isHighlighted: bar.isHighlighted }"
        :x="0"
        :y="bar.y - 2">{{ bar.label }}</text>
      <rect
        class="barGroup"
        :class="{ isVisible: !showRegions && barStacked }"
        :x="0"
        :y="bar.y"
        :width="bar.width"
        :height="bar.height" />
      </g>
  </g>
</template>

<script>
import { get, map, sumBy, intersection } from 'lodash'
import { mapState } from 'vuex'
import { GROUP_FOSSILS, GROUP_NON_FOSSILS, GROUP_OTHERS, GROUP_LABELS } from '~/store/config'
// import { MODELS } from '~/store/config'

export default {
  props: ['data', 'scenario', 'width', 'height', 'y', 'scaleX', 'groupHeight', 'extents', 'gap'],
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked,
      isColored: state => state.settings.isColored,
      showRegions: state => state.settings.showRegions,
      highlight: state => state.settings.highlight
    }),
    barGroups () {
      let x0 = 0

      return map([GROUP_FOSSILS, GROUP_NON_FOSSILS, GROUP_OTHERS], (variables, i) => {
        const sumMax = sumBy(variables, (variable) => {
          return get(this.extents, variable, 0)
        })

        const maxWidth = this.scaleX(sumMax) + this.gap * variables.length

        // width to be stacked
        const x1 = maxWidth
        x0 += x1

        return {
          label: GROUP_LABELS[i],
          x: x0 - x1,
          y: this.y - 10,
          width: maxWidth - this.gap,
          height: 1,
          isHighlighted: intersection(variables, this.highlight).length,
          hasHighlight: this.highlight.length
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

  .barGroup-wrapper {
    transition: transform $transition-animation $transition-type;
  }

  .barGroup, .barGroup--label {
    opacity: 0;
    transition: opacity $transition-animation $transition-type 0, width $transition-animation $transition-type;

    &.isVisible {
      opacity: 1;
      transition: opacity $transition-animation $transition-type $transition-animation, width $transition-animation $transition-type;

      &.hasHighlight {
        opacity: 0.2;
        transition: opacity $transition-animation $transition-type 0s, width $transition-animation $transition-type;

        &.isHighlighted {
          opacity: 1;
          fill: #000;
        }
      }
    }
  }
</style>
