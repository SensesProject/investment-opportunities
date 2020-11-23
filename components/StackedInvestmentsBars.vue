<template>
  <g class="bars">
    <BarGroups
      v-if="scenario === 'historic'"
      :data="data"
      :scaleX="scaleX"
      :groupHeight="groupHeight"
      :scenario="scenario"
      :gap="gap"
      :extents="extents"
      :y="y0" />
    <BarRegion
      :data="data"
      :scaleX="scaleX"
      :groupHeight="groupHeight"
      :scenario="scenario"
      :gap="gap"
      :extents="extents"
      :y="y0"
      :scenarioHeight="scenarioHeight"
      :height="height"
      :width="width" />
    <BarVariable
      :data="data"
      :scaleX="scaleX"
      :groupHeight="groupHeight"
      :scenario="scenario"
      :gap="gap"
      :extents="extents"
      :y="y0" />
    <BarScenario
      :data="data"
      :scaleX="scaleX"
      :groupHeight="groupHeight"
      :scenario="scenario"
      :y="y0"
      :height="height" />
  </g>
</template>

<script>
import { scaleLinear, scaleBand } from 'd3-scale'
import { format } from 'd3-format'
import { map, sum, values, filter, get, compact, round } from 'lodash'
import { mapState } from 'vuex'
import { getColorFromVariable } from '../assets/js/utils.js'
import { VARIABLES } from '~/store/config'
import BarScenario from '~/components/InvestmentRelative/BarScenario'
import BarVariable from '~/components/InvestmentRelative/BarVariable'
import BarRegion from '~/components/InvestmentRelative/BarRegion'
import BarGroups from '~/components/InvestmentRelative/BarGroups'

export default {
  props: ['data', 'scenario', 'extents', 'gap', 'width', 'height', 'y', 'scenarioHeight'],
  components: {
    BarScenario,
    BarVariable,
    BarRegion,
    BarGroups
  },
  data: () => {
    return {
      groupHeight: 50,
      margin: {
        left: 0,
        right: 0
      },
      models: ['median', 'POLES', 'REMIND-MAgPIE', 'AIM/CGE', 'IMAGE', 'MESSAGEix-GLOBIOM']
    }
  },
  computed: {
    headlineHeight () {
      return this.height < 500 ? 30 : 50
    },
    total () {
      return sum(values(this.extents))
    },
    scaleX () {
      return scaleLinear()
        .range([this.margin.left, this.width - (VARIABLES.length - 1) * this.gap - this.margin.right])
        .domain([0, this.total])
    },
    y0 () {
      return (this.height < 500 ? 30 : 50) + 10 + this.y
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
