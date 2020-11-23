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
    <div class="option vertical" :class="{ disabled: showRegions }">
      <label>Select region</label>
      <SensesSelect v-model="region" :options="regions" :disabled="showRegions" />
    </div>
    <div class="option horizontal" :class="{ disabled: showRegions }">
      <label>Un-stack investments</label>
      <InputSwitch v-model="barStacked" :disabled="showRegions" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SensesSelect from 'library/src/components/SensesSelect'
import InputSwitch from '~/components/Helper/InputSwitch'
import { map } from 'lodash'
import { getShortRegion } from '~/assets/js/utils.js'
import { REGIONS, ADDITIONAL_REGIONS, MODELS } from '~/store/config'

export default {
  components: {
    SensesSelect,
    InputSwitch
  },
  data: () => {
    return {
      models: MODELS
    }
  },
  computed: {
    ...mapState({
      step: state => state.settings.step
    }),
    regions () {
      return map(['World', ...REGIONS, ...ADDITIONAL_REGIONS], (region) => {
        return {
          label: getShortRegion(region),
          value: region
        }
      })
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
    grid-template-rows: repeat(4, auto);
    grid-row-gap: 0.5rem;

    @include query($medium) {
      grid-template-columns: auto;
      grid-row-gap: 0;
      grid-column-gap: 1rem;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .option {
    display: grid;

    &:not(:last-child) {
      padding-bottom: 0.5rem;
      border-bottom: 1px solid $color-pale-gray;

      @include query($medium) {
        border-bottom: none;
        border-right: 1px solid $color-pale-gray;
      }
    }

    &.vertical {
      grid-row-gap: 0.3rem;
      grid-template-columns: repeat(2, 1fr);
      justify-content: space-between;

      & > *:last-child {
        text-align: right;
      }

      @include query($medium) {
        grid-template-columns: unset;
        grid-template-rows: repeat(2, 1fr);
      }
    }

    &.horizontal {
      grid-template-columns: repeat(2, auto);
      justify-content: space-between;
      align-items: center;

      & > *:last-child {
        text-align: right;
      }
    }

    label {
      @include text-2();
      transition: color $transition-animation;
      // color: $color-neon;
    }

    &.disabled {
      label {
        color: $color-pale-gray;
      }
    }
  }

</style>
