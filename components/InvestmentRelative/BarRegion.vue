<template>
  <g class="barRegions-wrapper">
    <g class="barRegion-wrapper" v-for="variable in barRegions">
      <g v-for="bar in variable.barsRegions">
        <rect
          class="barRegion"
          :class="{ isVisible: showRegions && isColored }"
          :x="bar.x"
          :y="bar.y"
          :width="bar.width"
          :height="bar.height"
          :fill="bar.color"
          v-tooltip="{ content: bar.tooltip }"
          @mouseenter="() => changeGuides([bar.x, bar.x + bar.width])"
          @mouseleave="() => changeGuides([])"  />
        </g>
      </g>
    <g v-for="label in barRegionsLabels">
      <text
        class="barRegion--label"
        :class="{ isVisible: showRegions }"
        :x="label.x"
        :y="label.y">
        {{ label.region }}
      </text>
    </g>
  </g>
</template>

<script>
import { format } from 'd3-format'
import { scaleBand } from 'd3-scale'
import { get, find, map } from 'lodash'
import { mapState, mapActions } from 'vuex'
import { getColorFromVariable, longScenario } from '~/assets/js/utils.js'
import { VARIABLES, REGIONS, REGION_MAPPING_SHORT, REGION_MAPPING_LONG } from '~/store/config'

export default {
  props: ['data', 'scenario', 'width', 'height', 'y', 'scaleX', 'groupHeight', 'extents', 'gap', 'scenarioHeight'],
  data: () => {
    return {
      headlineHeight: 50
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
    scaleY () {
      return scaleBand()
        .range([0, this.showRegions ? this.scenarioHeight - 50 : this.groupHeight / 2])
        .domain(REGIONS)
        .paddingOuter(0)
        .paddingInner(0.7)
    },
    barRegionsLabels () {
      return map(REGIONS, (region, i) => {
        return {
          x: 0,
          y: this.y + this.scaleY(region) - 2 - 20,
          region: get(REGION_MAPPING_SHORT, region, region),
          tooltip: get(REGION_MAPPING_LONG, region, region)
        }
      })
    },
    barRegions () {
      let x0 = 0

      return map(VARIABLES, (variable) => {
        const d = find(this.data, { variable })

        const color = this.isColored ? getColorFromVariable(variable) : '#343437'

        const widthWorld = this.scaleX(get(d, ['values', 'World', this.model], 0))

        const barsRegions = map(REGIONS, (region, i) => {
          const value = get(d, ['values', region, this.model], 0)

          const reference = get(d, ['reference', region, this.model], 0)
          const [change, isPositiveChange] = get(d, ['changes', region, this.model], [])

          const tooltip = this.createVariableTooltip(region, variable, value, reference, change, isPositiveChange)

          const width = this.showRegions ? this.scaleX(value) : widthWorld
          const height = this.scaleY.bandwidth() // this.showRegions ? this.scenarioHeight : this.groupHeight / 2 / (REGIONS.length / 2)

          return {
            x: x0,
            y: this.y + this.scaleY(region) - 20,
            width,
            height,
            tooltip,
            color,
            region
          }
        })

        // width to be stacked
        const x1 = this.barStacked ? this.scaleX(get(this.extents, variable, 0)) + this.gap : widthWorld
        x0 += x1

        return {
          barsRegions
        }
      })
    }
  },
  methods: {
    ...mapActions('guides', [
      'changeGuides'
    ]),
    createVariableTooltip (region, variable, value, reference, change, isPositive) {
      const { formatNumber: fN } = this
      return `
        <header><strong>${variable}</strong><strong>${get(REGION_MAPPING_SHORT, region, region)}</strong><span>${fN(value)}</span></header>
        <p>
          ${get(REGION_MAPPING_SHORT, region, region)} is currently investing <strong>${fN(reference)}</strong> billion US dollar every year in ${variable}, but they ${this.scenario === 'NDC' ? 'pledged to' : 'should'} invest <strong>${fN(value)}</strong> for <strong>${longScenario(this.scenario)}</strong>.
          That is <strong>${fN(Math.abs(value - reference))} (${format('.0%')(change)}) ${isPositive ? 'more' : 'less'}</strong>.
        </p>
        <footer>
          <span>Scenario: ${longScenario(this.scenario)}</span><span>Model: ${this.model}</span>
        </footer>
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

  .barRegion--label {
    @include graphic-text-label-2();
    opacity: 0;
    transition: opacity $transition-animation linear 0s;

    &.isVisible {
      opacity: 1;
      transition: opacity $transition-animation linear $transition-animation;
    }
  }

  .barRegion {
    opacity: 0;
    transition: x $transition-animation linear 0s, fill $transition-animation, opacity $transition-animation, y $transition-animation, width $transition-animation;

    &.isVisible {
      opacity: 1;
      transition: x $transition-animation linear $transition-animation, fill $transition-animation, opacity $transition-animation, y $transition-animation, width $transition-animation;
    }
  }
</style>
