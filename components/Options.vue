<template>
  <div class="options">
    <SensesSelect v-model="region" :options="regions" />
    <SensesSelect v-model="model" :options="models" />
    <label><input type="checkbox" v-model="barStacked"> {{ barStacked ? 'not ' : '' }}stacked</label>
    <label><input type="checkbox" v-model="barDifference"> difference {{ barDifference ? '' : 'not ' }}colored</label>
  </div>
</template>

<script>
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale'
import { format } from 'd3-format'
import { range } from 'd3-array'
import { map, groupBy, sum, values, filter, get } from 'lodash'
import { mapState } from 'vuex'
import SensesSelect from 'library/src/components/SensesSelect'

export default {
  data: () => {
    return {
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
    barStacked: {
      get () {
        return this.$store.state.settings.barStacked
      },
      set (value) {
        this.$store.commit('SETTINGS_CHANGE', { key: 'barStacked', value })
      }
    },
    barDifference: {
      get () {
        return this.$store.state.settings.barDifference
      },
      set (value) {
        this.$store.commit('SETTINGS_CHANGE', { key: 'barDifference', value })
      }
    }
  },
  components: {
    SensesSelect
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .options {
    background-color: #fff;
    position: absolute;
    top: $spacing / 2;
    right: $spacing / 2;
    padding: $spacing / 4;
    border: 1px solid getColor(gray, 80);
    border-radius: $border-radius;
    font-size: $font-size-default;
    color: getColor(gray, 40);
    display: grid;
    justify-items: end;
    grid-gap: $spacing / 4;
  }

</style>
