<template>
  <div>
    <SensesMenu message="Work in Progress"/>
    <main class="container">
      <header class="page-header header wrapper">
        <h1>Investment Opportunities and Alignment</h1>
        <p><strong>PA requires energy transformations</strong></p>
        <p><strong>PA calls for alignment, picked up by many finance initiatives</strong></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <IntersectionObserver :step="0" :noStyling="true">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </IntersectionObserver>
      </header>
      <section class="section investment">
        <StackedInvestments />
        <div class="text">
          <IntersectionObserver :step="1" :noStyling="true">
            <h2><span class="ecff">Extraction and Conversion - Fossil Fuels</span> and <span class="effc">Electricity - Fossil Fuels w/o CCS</span></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <BarInvestmentsChart
              :gap="20"
              :data="relativeValues"
              path="scenario"
              :options="[
                { scenario: 'NDC', variable: 'Extraction and Conversion - Fossil Fuels' },
                { scenario: 'NDC', variable: 'Electricity - Fossil Fuels w/o CCS' },
                { scenario: '1.5C', variable: 'Extraction and Conversion - Fossil Fuels' },
                { scenario: '1.5C', variable: 'Electricity - Fossil Fuels w/o CCS' },
                { scenario: '2C', variable: 'Extraction and Conversion - Fossil Fuels' },
                { scenario: '2C', variable: 'Electricity - Fossil Fuels w/o CCS' }
              ]"
            />
          </IntersectionObserver>
          <IntersectionObserver :step="2" :noStyling="true">
            <h2><span class="enr">Electricity - Non-bio Renewables</span>, <span class="ecb">Extraction and Conversion - Bioenergy</span> and <span class="ecn">Extraction and Conversion - Nuclear</span></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <BarInvestmentsChart
              :gap="20"
              :data="relativeValues"
              path="scenario"
              :options="[
                { scenario: 'NDC', variable: 'Electricity - Non-bio Renewables' },
                { scenario: 'NDC', variable: 'Extraction and Conversion - Bioenergy' },
                { scenario: 'NDC', variable: 'Extraction and Conversion - Nuclear' },
                { scenario: '1.5C', variable: 'Electricity - Non-bio Renewables' },
                { scenario: '1.5C', variable: 'Extraction and Conversion - Bioenergy' },
                { scenario: '1.5C', variable: 'Extraction and Conversion - Nuclear' },
                { scenario: '2C', variable: 'Electricity - Non-bio Renewables' },
                { scenario: '2C', variable: 'Extraction and Conversion - Bioenergy' },
                { scenario: '2C', variable: 'Extraction and Conversion - Nuclear' }
              ]"
            />
          </IntersectionObserver>
          <IntersectionObserver :step="3" :noStyling="true">
            <h2><span class="ets">Electricity - T&D and Storage</span> and <span class="ccs">CCS</span></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <BarInvestmentsChart
              :gap="20"
              :data="relativeValues"
              path="scenario"
              :options="[
                { scenario: 'NDC', variable: 'Electricity - T&D and Storage' },
                { scenario: 'NDC', variable: 'CCS' },
                { scenario: '1.5C', variable: 'Electricity - T&D and Storage' },
                { scenario: '1.5C', variable: 'CCS' },
                { scenario: '2C', variable: 'Electricity - T&D and Storage' },
                { scenario: '2C', variable: 'CCSS' }
              ]"
            />
          </IntersectionObserver>
          <IntersectionObserver :step="4" :noStyling="true">
            <h2><span class="ee">Energy Efficiency</span></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <BarInvestmentsChart
              :gap="20"
              :data="relativeValues"
              path="scenario"
              :options="[
                { scenario: 'NDC', variable: 'Energy Efficiency' },
                { scenario: '1.5C', variable: 'Energy Efficiency' },
                { scenario: '2C', variable: 'Energy Efficiency' }
              ]"
            />
          </IntersectionObserver>
          <IntersectionObserver :step="5" :noStyling="true">
            <h2><span>Models</span></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
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
import { mapActions, mapGetters, mapState } from 'vuex'
// import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components//IntersectionObserver'
import SensesMeta from 'library/src/components/SensesMeta.vue'
import SensesMenu from 'library/src/components/SensesMenu.vue'
import StackedInvestments from '~/components/StackedInvestments'
import BarInvestments from '~/components/BarInvestments'
import BarInvestmentsChart from '~/components/BarInvestmentsChart'
import Options from '~/components/Options'

export default {
  components: {
    StackedInvestments,
    IntersectionObserver,
    BarInvestmentsChart,
    BarInvestments,
    Options,
    SensesMenu,
    SensesMeta
    // LayoutScrollytelling
  },
  computed: {
    ...mapState({
      step: state => state.settings.step
    }),
    ...mapGetters([
      'relativeValues'
    ])
  },
  created () {
    this.loadInvestments()
  },
  methods: {
    ...mapActions([
      'loadInvestments',
      'changeSettings'
    ])
  },
  mounted () {
    console.log('Step', this.step)
    this.$on('step', (step) => {
      console.log({ step })
      this.changeSettings({ key: 'step', value: step })
      switch (step) {
        case 0:
          this.changeSettings({ key: 'isRotated', value: false })
          this.changeSettings({ key: 'barStacked', value: false })
          this.changeSettings({ key: 'showModels', value: false })
          this.changeSettings({ key: 'highlight', value: [] })
          break
        case 1:
          this.changeSettings({ key: 'isRotated', value: true })
          this.changeSettings({ key: 'barStacked', value: true })
          this.changeSettings({ key: 'showModels', value: false })
          this.changeSettings({ key: 'highlight', value: ['Extraction and Conversion - Fossil Fuels', 'Electricity - Fossil Fuels w/o CCS'] })
          break
        case 2:
          this.changeSettings({ key: 'isRotated', value: true })
          this.changeSettings({ key: 'barStacked', value: true })
          this.changeSettings({ key: 'showModels', value: false })
          this.changeSettings({ key: 'highlight', value: ['Electricity - Non-bio Renewables', 'Extraction and Conversion - Bioenergy', 'Extraction and Conversion - Nuclear'] })
          break
        case 3:
          this.changeSettings({ key: 'isRotated', value: true })
          this.changeSettings({ key: 'barStacked', value: true })
          this.changeSettings({ key: 'showModels', value: false })
          this.changeSettings({ key: 'highlight', value: ['Electricity - T&D and Storage', 'CCS'] })
          break
        case 4:
          this.changeSettings({ key: 'isRotated', value: true })
          this.changeSettings({ key: 'barStacked', value: true })
          this.changeSettings({ key: 'showModels', value: false })
          this.changeSettings({ key: 'highlight', value: ['Energy Efficiency'] })
          break
        case 5:
          this.changeSettings({ key: 'isRotated', value: true })
          this.changeSettings({ key: 'barStacked', value: true })
          this.changeSettings({ key: 'showModels', value: true })
          this.changeSettings({ key: 'highlight', value: [] })
          break
      }
    })
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
        // padding-top: 30vh;
      }

      & > div {
        width: 50%;
        margin-left: 50%;
      }
    }
  }

</style>
