<template>
  <header>
    <span class="label wrapper" v-html="label" />
    <div class="intro wrapper">
      <span v-if="scenario === 'CPol'">{{ region }} is currently investing <strong>{{ sumThisLabel }}</strong> Billion US-Dollar per year.</span>
      <span v-else>In total, <strong>{{ diffLabel }}</strong> Billion US-Dollar <strong>{{ diff > 0 ? 'more' : 'less' }}</strong> per year</span>
    </div>
  </header>
</template>

<script>
import { format } from 'd3-format'
import { map, sum, get } from 'lodash'
import { mapState } from 'vuex'

export default {
  props: ['scenario', 'elements'],
  computed: {
    ...mapState({
      region: state => state.settings.region
    }),
    label () {
      const pronom = this.region === 'World' ? 'we' : this.region
      const labels = {
        CPol: `What ${pronom} ${this.region === 'World' ? 'are' : 'is'} <strong>currently</strong> investing <small>(Current policies)</small>`,
        NDC: `What ${pronom} <strong>pledged</strong> to invest <small>(Nationally Determined Contributions)</small>`,
        '2C': `What ${pronom} <strong>should</strong> invest for <strong>2°C</strong>`,
        '1.5C': `What ${pronom} <strong>should</strong> invest for <strong>1.5°C</strong>`
      }
      return get(labels, this.scenario, this.scenario)
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
      return this.sumThis - this.sumReference
    },
    diffLabel () {
      return this.formatNumber(Math.abs(this.diff))
    }
  },
  methods: {
    formatNumber (n) {
      return format(',.3r')(n)
    }
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
  }
</style>
