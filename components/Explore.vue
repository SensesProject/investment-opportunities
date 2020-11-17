<template>
  <div class="options">
    <div class="option vertical">
      <label>Select model</label>
      <SensesSelect v-model="model" :options="models" />
    </div>
    <div class="option horizontal">
      <label>Compare regions</label>
      <InputSwitch v-model="showRegions" />
    </div>
    <div class="option vertical">
      <label>Select region</label>
      <SensesSelect v-model="region" :options="regions" />
    </div>
    <div class="option horizontal">
      <label>Stack variables</label>
      <InputSwitch v-model="barStacked" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SensesSelect from 'library/src/components/SensesSelect'
import InputSwitch from '~/components/Helper/InputSwitch'

export default {
  components: {
    SensesSelect,
    InputSwitch
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
          label: 'median',
          value: 'median'
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
    showRegions: {
      get () {
        return this.$store.state.settings.showRegions
      },
      set (value) {
        this.$store.commit('SETTINGS_CHANGE', { key: 'showRegions', value })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1rem;
  }

  .option {
    display: grid;

    &:not(:last-child) {
      border-right: 1px solid $color-pale-gray;
    }

    &.vertical {
      grid-row-gap: 0.3rem;
      grid-template-rows: repeat(2, 1fr);
    }

    &.horizontal {
      grid-template-columns: repeat(2, auto);
    }

    label {
      @include text-2();
      // color: $color-neon;
    }
  }

</style>
