<template>
  <div class="options">
    Step: {{ step }}<br />
    <SensesSelect v-model="region" :options="regions" />
    <SensesSelect v-model="model" :options="models" />
    <label><input v-model="barStacked" type="checkbox"> {{ barStacked ? '' : 'not ' }}stacked</label>
    <label><input v-model="barDifference" type="checkbox"> difference {{ barDifference ? '' : 'models ' }}colored</label>
    <label><input v-model="showModels" type="checkbox"> {{ showModels ? 'hide' : 'show' }} models</label>
    <label><input v-model="isRotated" type="checkbox"> {{ isRotated ? 'is not' : 'is' }} rotated</label>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SensesSelect from 'library/src/components/SensesSelect'

export default {
  components: {
    SensesSelect
  },
  data: () => {
    return {
      models: [
        {
          label: 'AIM/CGE',
          value: 'AIM/CGE'
        },
        {
          label: 'IMAGE',
          value: 'IMAGE'
        },
        {
          label: 'MESSAGEix-GLOBIOM',
          value: 'MESSAGEix-GLOBIOM'
        },
        {
          label: 'POLES',
          value: 'POLES'
        },
        {
          label: 'REMIND-MAgPIE',
          value: 'REMIND-MAgPIE'
        },
        {
          label: 'WITCH-GLOBIOM',
          value: 'WITCH-GLOBIOM'
        },
        {
          label: 'average',
          value: 'average'
        }
      ],
      regions: [
        {
          label: 'The World',
          value: 'World'
        },
        {
          label: 'China',
          value: 'CHN'
        },
        {
          label: 'EU',
          value: 'EU'
        },
        {
          label: 'India',
          value: 'IND'
        },
        {
          label: 'USA',
          value: 'USA'
        },
        {
          label: 'R5OECD90+EU',
          value: 'R5OECD90+EU'
        },
        {
          label: 'R5REF',
          value: 'R5REF'
        },
        {
          label: 'R5ASIA',
          value: 'R5ASIA'
        },
        {
          label: 'R5MAF',
          value: 'R5MAF'
        },
        {
          label: 'R5LAM',
          value: 'R5LAM'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      step: state => state.settings.step
    }),
    isRotated: {
      get () {
        return this.$store.state.settings.isRotated
      },
      set (value) {
        console.log({ value })
        this.$store.commit('SETTINGS_CHANGE', { key: 'isRotated', value })
      }
    },
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
    },
    showModels: {
      get () {
        return this.$store.state.settings.showModels
      },
      set (value) {
        this.$store.commit('SETTINGS_CHANGE', { key: 'showModels', value })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .options {
    background-color: #fff;
    top: $spacing * 2;
    position: fixed;
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
