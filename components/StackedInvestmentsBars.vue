<template>
  <StackedInvestmentsFormulation
    :data="data"
    :scenario="scenario"
    :extents="extents"
    :variables="variables"
    :gap="gap"
    :width="width"
    :height="height" />
</template>

<script>
import { scaleLinear, scaleBand } from 'd3-scale'
import { format } from 'd3-format'
import { map, sum, values, filter, get, compact } from 'lodash'
import { mapState } from 'vuex'
import StackedInvestmentsFormulation from '~/components/StackedInvestmentsFormulation'

const colors = {
  'Energy Efficiency': '#8c8c94',
  'CCS': '#d7d7e3',
  'Electricity - T&D and Storage': '#aaa',
  'Extraction and Conversion - Nuclear': '#feeda1',
  'Extraction and Conversion - Bioenergy': '#e9f6a1',
  'Hydrogen - Non-fossil': '#e9f6a1',
  'Energy Supply|Electricity|Solar': '#229c53',
  'Energy Supply|Electricity|Wind': '#b7e075',
  'Hydrogen - Fossil': '#da372a',
  'Electricity - Fossil Fuels w/o CCS': '#a50026',
  'other renewables': '#229c53',
  'Coal': '#da372a',
  'Oil and Gas': '#a50026'
}

function getColorFromVariable (variable) {
  return get(colors, variable, '#000')
}

export default {
  props: ['data', 'scenario', 'extents', 'variables', 'gap', 'width', 'height'],
  components: {
    StackedInvestmentsFormulation
  },
  data: () => {
    return {
      // colors: ['#aaa', '#feeda1', '#fdbf6f', '#e9f6a1', '#b7e075', '#229c53', '#da372a', '#a50026'],
      groupHeight: 50,
      margin: {
        left: 0,
        right: 0
      },
      models: ['average', 'POLES', 'REMIND-MAgPIE', 'AIM/CGE', 'IMAGE', 'MESSAGEix-GLOBIOM']
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
    elements () {
      const { isColored, barStacked, showModels } = this
      console.log({ isColored })

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
        const groupHeight = bandwidth / 2 + 1

        const bars = compact(map(values, (value, key) => {
          const reference = get(references, key, 0)

          const y = showModels ? this.scaleY(key) : this.scaleY(key) - bandwidth / 2 * n

          const x1 = barStacked ? this.scaleX(get(this.extents, variable, value)) + this.gap : this.scaleX(value)
          const width = this.scaleX(showModels ? value : average)
          const marker = this.scaleX(showModels ? reference : referenceAverage)
          const diff = value - reference
          const tooltip = this.createTooltip(variable, value, reference, diff)

          if (key === 'max') {
            return false
          }
          n++
          const style = {
            transformOrigin: `${this.width / 2}px ${this.width / 2}px`,
            transform: `translate(${this.isRotated ? 0 : x0}px, ${this.isRotated ? this.height - x0 : 40}px)`
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
        x0 += this.barStacked ? this.scaleX(get(this.extents, variable, maxValue)) + this.gap : this.scaleX(maxValue)

        return {
          labelX,
          labelY,
          value: this.formatNumber(average),
          diff: this.formatNumber(average - referenceAverage),
          bars
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

</style>
