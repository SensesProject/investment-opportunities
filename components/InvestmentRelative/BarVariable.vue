<template>
  <g class="barVariables-wrapper">
    <g class="barVariable-wrapper" v-for="bar in barVariables">
      <rect
        class="barVariable"
        :class="[changeClass, { isVisible: !showRegions, isStacked: barStacked, hasHighlight: highlight.length, isHighlighted: highlight.includes(bar.variable) }]"
        :x="bar.x"
        :y="bar.y"
        :width="bar.width"
        :height="bar.height"
        :fill="bar.color"
        v-tooltip="bar.tooltip"
        @mouseenter="() => changeGuides([bar.x, bar.x + bar.width])"
        @mouseleave="() => changeGuides([])"  />
      </g>
  </g>
</template>

<script>
import { format } from 'd3-format'
import { get, find, map } from 'lodash'
import { mapState, mapActions } from 'vuex'
import { getColorFromVariable, createTooltip } from '~/assets/js/utils.js'
import { VARIABLES } from '~/store/config'

export default {
  props: ['data', 'scenario', 'width', 'height', 'y', 'scaleX', 'groupHeight', 'extents', 'gap'],
  data: () => {
    return {
      headlineHeight: 50,
      changeClass: false
    }
  },
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked,
      isColored: state => state.settings.isColored,
      showRegions: state => state.settings.showRegions,
      highlight: state => state.settings.highlight,
      model: state => state.settings.model,
      region: state => state.settings.region
    }),
    barVariables () {
      let x0 = 0

      return map(VARIABLES, (variable) => {
        const d = find(this.data, { variable })
        const value = get(d, ['values', this.region, this.model], 0)

        const reference = get(d, ['reference', this.region, this.model], 0)
        const [change, isPositiveChange] = get(d, ['changes', this.region, this.model], [])

        const color = this.isColored ? getColorFromVariable(variable) : '#343437'

        const tooltip = createTooltip('variable', this.region, variable, value, reference, change, isPositiveChange, this.scenario, this.model)

        const width = this.showRegions ? 0 : this.scaleX(value)
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
    ...mapActions('guides', [
      'changeGuides'
    ])
  },
  watch: {
    // The transitions of the different stages depend on what is changing.
    // By adding this class we can define the transition durations.
    highlight () {
      this.changeClass = 'change-highlight'
    },
    showRegions () {
      this.changeClass = 'change-showRegions'
    },
    barStacked () {
      this.changeClass = 'change-barStacked'
    },
    region () {
      this.changeClass = 'change-region'
    },
    model () {
      this.changeClass = 'change-model'
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/global";

  .barVariable {

    &.change-barStacked {
      opacity: 0;
      transition:
        x $transition-animation $transition-type 0s,
        fill $transition-animation $transition-type $transition-animation,
        opacity $transition-animation $transition-type $transition-animation * 2,
        width $transition-animation $transition-type;

      &.isStacked, &.isVisible {
        opacity: 1;
        transition:
          x $transition-animation $transition-type $transition-animation,
          fill $transition-animation $transition-type 0s,
          opacity $transition-animation $transition-type 0s,
          width $transition-animation $transition-type;
      }
    }

    &.change-region, &.change-model {
      opacity: 0;
      transition:
        x $transition-animation $transition-type 0s,
        fill $transition-animation $transition-type $transition-animation,
        opacity $transition-animation $transition-type $transition-animation * 2,
        width $transition-animation $transition-type;

      &.isVisible {
        opacity: 1;
        transition:
          x $transition-animation $transition-type 0s,
          fill $transition-animation $transition-type 0s,
          opacity $transition-animation $transition-type 0s,
          width $transition-animation $transition-type;
      }
    }

    &.change-showRegions {
      opacity: 0;
      transition:
        x $transition-animation $transition-type 0s,
        fill $transition-animation $transition-type,
        opacity $transition-animation $transition-type 0s,
        width $transition-animation $transition-type $transition-animation;

      &.isVisible {
        opacity: 1;
        transition:
          x $transition-animation $transition-type $transition-animation * 2,
          fill $transition-animation $transition-type,
          opacity $transition-animation $transition-type $transition-animation,
          width $transition-animation $transition-type 0s;
      }
    }

    &.change-highlight {
      transition: opacity $transition-animation $transition-type 0s;

      &.hasHighlight {
        opacity: 0.2;
        transition: opacity $transition-animation $transition-type 0s;

        &.isHighlighted {
          opacity: 1;
        }
      }
    }
  }
</style>
