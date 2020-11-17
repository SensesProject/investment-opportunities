<template>
  <g>
    <text :x="0" :y="y + headlineHeight" :class="['headline', 'wrapper', { isRotated }]" v-html="label" />
  </g>
</template>

<script>
import { format } from 'd3-format'
import { map, sum, get } from 'lodash'
import { mapState } from 'vuex'

export default {
  props: ['scenario', 'elements', 'height', 'y', 'headlineHeight', 'isRotated'],
  computed: {
    ...mapState({
      region: state => state.settings.region
    }),
    label () {
      const pronom = this.region === 'World' ? 'we' : this.region
      const labels = {
        CPol: `What ${pronom} ${this.region === 'World' ? 'are' : 'is'} <tspan>currently</tspan> investing <small>(average 2017-2019)</small>`,
        NDC: `What ${pronom} <tspan>pledged</tspan> to invest <small>(Nationally Determined Contributions)</small>`,
        '2C': `What ${pronom} <tspan>should</tspan> invest for <tspan>2°C</tspan>`,
        '1.5C': `What ${pronom} <tspan>should</tspan> invest for <tspan>1.5°C</tspan>`
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

  .headline {
    margin-bottom: $spacing / 8;
    display: block;
    font-size: $font-size-bigger;
    font-weight: $font-weight-regular;
    font-family: $font-serif;
    opacity: 1;
    transition: opacity $transition-animation;

    &.isRotated {
      opacity: 0;
    }

    small {
      font-size: $font-size-default;
      color: getColor(gray, 60);
    }

    tspan {
      font-weight: $font-weight-bold;
      font-family: $font-sans;
    }
  }
</style>
