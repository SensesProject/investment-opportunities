<template>
  <div>
    <SensesMenu message="Work in Progress"/>
    <main class="container">
      <header class="page-header header wrapper">
        <h1>Investment Opportunities and Alignment</h1>
        <p><strong>PA requires energy transformations</strong></p>
        <p><strong>PA calls for alignment, picked up by many finance initiatives</strong></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </header>
      <section class="section investment">
        <StackedInvestments />
        <div class="text">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <BarInvestmentsChart
            :gap="20"
            :data="relativeValues"
            path="scenario"
            :options="[{ scenario: 'NDC' }, { scenario: '1.5C' }, { scenario: '2C' }]"
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <BarInvestmentsChart
            :gap="20"
            :data="relativeValues"
            path="scenario"
            :options="[
              { scenario: 'NDC', variable: 'Extraction and Conversion - Fossil Fuels' },
              { scenario: '1.5C', variable: 'Extraction and Conversion - Fossil Fuels' },
              { scenario: '2C', variable: 'Extraction and Conversion - Fossil Fuels' }
            ]"
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </section>
      <BarInvestments />
      <div class="wrapper margin">
        <h2>Trade-off curves for single technologies</h2>
        <img src="graphic-2.png">
        <small>McCollum, D.L., Zhou, W., Bertram, C. et al. Energy investment needs for fulfilling the Paris Agreement and achieving the Sustainable Development Goals. Nat Energy 3, 589–599 (2018). </small>
      </div>
      <Options />
      <SensesMeta id="investment-opportunities"/>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SensesMeta from 'library/src/components/SensesMeta.vue'
import SensesMenu from 'library/src/components/SensesMenu.vue'
import StackedInvestments from '~/components/StackedInvestments'
import BarInvestments from '~/components/BarInvestments'
import BarInvestmentsChart from '~/components/BarInvestmentsChart'
import Options from '~/components/Options'

export default {
  components: {
    StackedInvestments,
    BarInvestmentsChart,
    BarInvestments,
    Options,
    SensesMenu,
    SensesMeta
  },
  computed: {
    ...mapGetters([
      'relativeValues'
    ])
  },
  created () {
    this.loadInvestments()
  },
  methods: {
    ...mapActions([
      'loadInvestments'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .container {
    .wrapper {
      &.margin {
        margin-top: $spacing * 8;
      }

      ul {
        margin: $spacing 0 0 $spacing;
      }

      img {
        margin-top: $spacing;
        width: 100%;
      }
    }

    .investment {
      width: 100%;
      min-height: 500px;
      position: relative;

      .text {
        z-index: $z-index-text;
      }

      .text *:first-child {
        padding-top: 500px;
      }

      & > div {
        width: 50%;
        margin-left: 50%;
      }
    }
  }

</style>
