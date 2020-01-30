<template>
  <div class="bars">
    <span class="label" v-html="label" />
    <div class="intro">
      <span v-if="scenario === 'CPol'"><SensesSelect v-model="region" :options="regions" /> is currently investing <strong>{{ sumThisLabel }}</strong> Billion US-Dollar per year according to the <SensesSelect v-model="model" :options="models" /> model.</span>
      <span v-else>In total, <strong>{{ diff }}</strong> Billion US-Dollar more per year</span>
    </div>
    <svg ref="vis" class="vis">
      <g v-for="(el, i) in elements" v-if="width" v-tooltip="el.tooltip">
        <rect
          :x="el.x0 - el.x1"
          :width="el.width"
          :height="50"
          :y="0"
          :style="{ fill: el.color }" />
        <g v-if="el.marker !== el.width">
          <g v-if="el.marker < el.width">
            <rect
              :x="el.x0 - el.x1"
              :width="el.marker"
              :height="50"
              :y="0"
              :style="{ fill: '#fff', opacity: 0.8 }" />
            <line
              :x1="el.x0 - el.x1 + el.marker"
              :x2="el.x0 - el.x1 + el.marker"
              :y1="0"
              :y2="50"
              class="more" />
          </g>
          <g v-else>
            <rect
              :x="el.x0 - el.x1"
              :width="el.width"
              :height="50"
              :y="0"
              :style="{ fill: '#fff', opacity: 0.8 }" />
            <rect
              v-if="el.marker > el.width"
              :x="el.x0 - el.x1 + el.width"
              :width="el.marker - el.width"
              :height="50"
              :style="{ fill: el.color }"
              :y="0" />
            <rect
              v-if="el.marker > el.width"
              :x="el.x0 - el.x1 + el.width"
              :width="el.marker - el.width"
              :height="50"
              :y="0"
              :style="{ fill: 'url(#diagonal-stripe-more)' }" />
            <line
              :x1="el.x0 - el.x1 + el.width"
              :x2="el.x0 - el.x1 + el.width"
              :y1="0"
              :y2="50"
              class="more" />
          </g>
        </g>
      </g>
      <defs>
        <pattern id="diagonal-stripe-more" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d='M-1,1 l2,-2
                   M0,10 l10,-10
                   M9,11 l2,-2' stroke='#fff' style="opacity: 0.8" stroke-width='1.5'/>
        </pattern>
        <pattern id="diagonal-stripe-less" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d='M-1,1 l2,-2
                   M0,10 l10,-10
                   M9,11 l2,-2' stroke='#fff' style="opacity: 0.9" stroke-width='4'/>
        </pattern>
      </defs>
    </svg>
    <footer v-if="scenario !== 'CPol'" class="labels" :style="{ 'grid-template-columns': widths, 'width': `calc(100% - ${gaps}px)`, 'grid-column-gap': `${gap}px` }">
      <section v-for="(el, i) in elements" :style="{ 'text-align': el.marker < el.width ? 'left' : 'right' }">
        {{ el.diff }}
      </section>
    </footer>
  </div>
</template>

<script>
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale'
import { format } from 'd3-format'
import { range } from 'd3-array'
import { map, groupBy, sum, values, filter, get } from 'lodash'
import { mapGetters } from 'vuex'
import SensesSelect from 'library/src/components/SensesSelect'

export default {
  props: ['data', 'scenario', 'extents', 'variables', 'reference', 'gap'],
  data: () => {
    return {
      colors: ['#aaa', '#feeda1', '#fdbf6f', '#e9f6a1', '#b7e075', '#229c53', '#da372a', '#a50026'],
      width: 0,
      height: 0,
      margin: {
        left: 0,
        right: 0,
        top: 70,
        bottom: 10
      },
      models: [
        {
          'label': 'AIM/CGE',
          'value': 'AIM/CGE'
        },
        {
          'label': 'IMAGE',
          'value': 'IMAGE'
        },
        {
          'label': 'MESSAGEix-GLOBIOM',
          'value': 'MESSAGEix-GLOBIOM'
        },
        {
          'label': 'POLES',
          'value': 'POLES'
        },
        {
          'label': 'REMIND-MAgPIE',
          'value': 'REMIND-MAgPIE'
        },
        {
          'label': 'WITCH-GLOBIOM',
          'value': 'WITCH-GLOBIOM'
        }
      ],
      regions: [
        {
          'label': 'The World',
          'value': 'World'
        },
        {
          'label': 'China',
          'value': 'CHN'
        },
        {
          'label': 'EU',
          'value': 'EU'
        },
        {
          'label': 'India',
          'value': 'IND'
        },
        {
          'label': 'USA',
          'value': 'USA'
        },
        {
          'label': 'R5OECD90+EU',
          'value': 'R5OECD90+EU'
        },
        {
          'label': 'R5REF',
          'value': 'R5REF'
        },
        {
          'label': 'R5ASIA',
          'value': 'R5ASIA'
        },
        {
          'label': 'R5MAF',
          'value': 'R5MAF'
        },
        {
          'label': 'R5LAM',
          'value': 'R5LAM'
        }
      ]
    }
  },
  computed: {
    region: {
      get () {
        return this.$store.state.settings.region
      },
      set (value) {
        this.$store.commit('SETTINGS_CHANGE', { key: 'region', value })
      }
    },
    model: {
      get () {
        return this.$store.state.settings.model
      },
      set (value) {
        this.$store.commit('SETTINGS_CHANGE', { key: 'model', value })
      }
    },
    total () {
      return sum(values(this.extents))
    },
    label () {
      const labels = {
        'CPol': 'What we are <strong>currently</strong> investing <small>(Current policies)</small>',
        'NDC': 'What we <strong>pledged</strong> to invest <small>(Nationally Determined Contributions)</small>',
        '2C': 'What we <strong>should</strong> invest for <strong>2°C</strong>',
        '1.5C': 'What we <strong>should</strong> invest for <strong>1.5°C</strong>'
      }
      return get(labels, this.scenario, this.scenario)
    },
    scaleX () {
      return scaleLinear()
        .range([this.margin.left, this.width - (this.variables.length - 1) * this.gap - this.margin.right])
        .domain([0, this.total])
    },
    widths () {
      return map(this.elements, d => { return `${get(d, 'x1', 0) - this.gap}px` }).join(' ')
    },
    gaps () {
      return (this.elements.length - 1) * this.gap
    },
    sumThis () {
      return sum(map(this.elements, 'value'))
    },
    sumThisLabel () {
      return this.formatNumber(this.sumThis)
    },
    sumReference () {
      return sum(map(this.elements, 'reference'))
    },
    diff () {
      const diff = this.sumThis - this.sumReference
      return this.formatNumber(diff).replace('-', '–')
    },
    elements () {
      let x0 = 0
      return map(this.variables, (variable, i) => {
        const value = get(get(filter(this.data, { variable }), 0), 'value', 0)
        const reference = get(get(filter(this.reference, { variable }), 0), 'value', 0)
        const x1 = this.scaleX(get(this.extents, variable, value)) + this.gap
        const width = this.scaleX(value)
        const marker = this.scaleX(reference)
        const color = get(this.colors, i, '#222')
        const diff = value - reference
        const tooltip = this.createTooltip(variable, value, reference, diff)
        x0 += x1
        return {
          label: variable,
          diff: (diff > 0 ? '+' : '') + this.formatNumber(diff).replace('-', '–'),
          x0,
          x1,
          width,
          value,
          reference,
          color,
          marker,
          tooltip
        }
      })
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  updated () {
    this.calcSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
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
          <strong>${fN(Math.abs(diff))} ${diff > 0 ? 'more': 'less'}</strong> in ${variable}.
        </p>
      `
    },
    formatNumber (n) {
      return format(',.3r')(n)
    },
    calcSizes () {
      const { vis: el } = this.$refs
      if (el !== 'undefined') {
        this.width = el.clientWidth || el.parentNode.clientWidth
        this.height = el.clientHeight || el.parentNode.clientHeight
      }
    }
  },
  components: {
    SensesSelect
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/global";

  .bars {
    .label {
      margin-bottom: $spacing / 8;
      display: block;
      font-size: $font-size-bigger;
      font-weight: $font-weight-regular;
      font-family: $font-serif;

      small {
        font-size: $font-size-default;
        color: getColor(gray, 60);
      }

      strong {
        font-weight: $font-weight-bold;
        font-family: $font-sans;
      }
    }

    .intro {
      font-size: $font-size-default;
      margin-bottom: $spacing / 2;
      display: block;
      color: getColor(gray, 40);
    }

    .vis {
      width: 100%;
      height: 50px;

      line {
        &.more {
          stroke: #fff;
          stroke-width: 2px;
          stroke-dasharray: 2px, 2px;
        }
      }
    }

    .labels {
      display: grid;
      font-size: $font-size-small;
      color: getColor(gray, 60);
    }
  }

</style>
