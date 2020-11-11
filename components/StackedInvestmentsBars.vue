<template>
  <g class="bars">
<!--     <g v-for="({ bars, variable }) in elements" :class="variable" v-tooltip="{ content: `${variable}` }">
      <g
        v-for="bar in bars"
        :key="bar.id"
        class="bar"
        :style="bar.style">
        <StackedInvestmentsBar
          :width="bar.width"
          :groupHeight="bar.groupHeight"
          :variable="bar.label"
          :id="bar.id"
          :y="bar.y"
          :color="bar.color" />
        <g v-if="bar.marker !== bar.width" :class="['difference', { showDifference }]">
          <StackedInvestmentsDiffLess
            v-if="bar.marker < bar.width"
            v-bind="bar" />
          <StackedInvestmentsDiffMore
            v-else
            v-bind="bar" />
        </g>
      </g>
    </g> -->
    <BarVariable
      :data="data"
      :variables="variables"
      :scaleX="scaleX"
      :groupHeight="groupHeight"
      :scenario="scenario"
      :gap="gap"
      :extents="extents"
      :y="y0" />
    <BarScenario
      :data="data"
      :variables="variables"
      :scaleX="scaleX"
      :groupHeight="groupHeight"
      :scenario="scenario"
      :y="y0" />
  </g>
</template>

<script>
import { scaleLinear, scaleBand } from 'd3-scale'
import { format } from 'd3-format'
import { map, sum, values, filter, get, compact, round } from 'lodash'
import { mapState } from 'vuex'
import { getColorFromVariable } from '../assets/js/utils.js'
// import StackedInvestmentsBar from '~/components/StackedInvestmentsBar'
// import StackedInvestmentsDiffLess from '~/components/StackedInvestmentsDiffLess'
// import StackedInvestmentsDiffMore from '~/components/StackedInvestmentsDiffMore'
import BarScenario from '~/components/InvestmentRelative/BarScenario'
import BarVariable from '~/components/InvestmentRelative/BarVariable'

export default {
  props: ['data', 'scenario', 'extents', 'variables', 'gap', 'width', 'height', 'y'],
  components: {
    // StackedInvestmentsBar,
    // StackedInvestmentsDiffLess,
    // StackedInvestmentsDiffMore,
    BarScenario,
    BarVariable
  },
  data: () => {
    return {
      groupHeight: 50,
      headlineHeight: 50,
      margin: {
        left: 0,
        right: 0
      },
      models: ['average', 'POLES', 'REMIND-MAgPIE', 'AIM/CGE', 'IMAGE', 'MESSAGEix-GLOBIOM'],
      formulations: ['CPol', 'NDC', '2C', '1.5C']
    }
  },
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked,
      showDifference: state => state.settings.barDifference,
      showModels: state => state.settings.showModels,
      isRotated: state => state.settings.isRotated,
      isColored: state => state.settings.isColored
    }),
    total () {
      return sum(values(this.extents))
    },
    scaleX () {
      return scaleLinear()
        .range([this.margin.left, this.width - (this.variables.length - 1) * this.gap - this.margin.right])
        .domain([0, this.total])
    },
    scaleY () {
      return scaleBand()
        .range([0, this.groupHeight])
        .domain(this.models)
        .paddingOuter(0)
    },
    widths () {
      return map(this.elements, (d) => { return get(d, ['bars', 0, 'width'], 0) - this.gap })
    },
    y0 () {
      return this.headlineHeight + 10 + this.y
    },
    // y () {
    //   return this.formulations.indexOf(this.scenario) * (this.groupHeight + this.headlineHeight)
    // },
    elements () {
      const { isColored } = this

      let x0 = 0
      return map(this.variables, (variable, i) => {
        const color = isColored ? getColorFromVariable(variable) : '#222'
        const data = get(filter(this.data, { variable }), 0)

        const values = get(data, ['values'], {})
        const references = get(data, ['reference'], {})

        const average = get(values, 'average', 0)
        const referenceAverage = get(references, 'average', 0)

        let n = 0

        const bandwidth = this.scaleY.bandwidth()
        const groupHeight = bandwidth / 2
        // const height = groupHeight * values.length

        const bars = compact(map(values, (value, key) => {
          const reference = get(references, key, 0)

          // const x = this.scaleX(value)
          const y = this.showModels ? this.scaleY(key) : this.scaleY(key) - bandwidth / 2 * n

          const x1 = this.barStacked ? this.scaleX(get(this.extents, variable, value)) + this.gap : this.scaleX(value)
          const width = this.scaleX(this.showModels ? value : average)
          const marker = this.scaleX(this.showModels ? reference : referenceAverage)
          const diff = value - reference
          const tooltip = this.createTooltip(variable, value, reference, diff)

          if (key === 'max') {
            return false
          }
          n++

          const style = {
            transform: `translate(${x0}px, ${this.y0}px)`
          }
          return {
            id: key,
            x: x0,
            y,
            label: variable,
            diff: (diff > 0 ? '+' : '') + this.formatNumber(diff).replace('-', '–'),
            x0,
            x1,
            width,
            value: this.formatNumber(value),
            groupHeight,
            reference,
            color,
            marker,
            tooltip,
            style
          }
        }))

        const labelX = x0
        const labelY = this.groupHeight / 2 + bandwidth / 2

        const maxValue = get(values, this.barStacked ? 'max' : 'average')
        x0 += round(this.barStacked ? this.scaleX(get(this.extents, variable, maxValue)) + this.gap : this.scaleX(maxValue), 0)

        return {
          labelX,
          labelY,
          value: this.formatNumber(average),
          diff: this.formatNumber(average - referenceAverage),
          bars,
          variable
        }
      })
    }
  },
  methods: {
    createTooltip (variable, value, reference, diff) {
      const { formatNumber: fN } = this
      return `
        <header>${variable}</header>
        <p>
          We are currently investing <strong>${fN(reference)}</strong> Billion US-Dollar per year,<br />
          but we should invest <strong>${fN(value)}</strong>.
          That means, we should invest<br />
          <strong>${fN(Math.abs(diff))} ${diff > 0 ? 'more' : 'less'}</strong> in ${variable}.
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

  g {
    transition: transform $transition-animation;
  }

  line {
    transition: opacity $transition-animation, x1 $transition-animation, x2 $transition-animation, y1 $transition-animation, y2 $transition-animation;
  }

  line {
    &.more {
      stroke: #fff;
      stroke-width: 2px;
      stroke-dasharray: 1px, 1px;
    }
  }

  .difference {
    rect, line {
      opacity: 0;
    }

    &.showDifference {
      rect, line {
        opacity: 1;
      }
    }
  }

  .label {
    font-size: $font-size-small;
    fill: getColor(gray, 60);
    font-family: $font-sans;
  }

  .labels {
    display: grid;
    font-size: $font-size-small;
    color: getColor(gray, 60);
  }

</style>
