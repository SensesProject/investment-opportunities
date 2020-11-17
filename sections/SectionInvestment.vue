<template>
  <section class="section section--investment">
    <div class="graphic">
      <StackedInvestments />
    </div>
    <div class="steps">
      <IntersectionObserver :step="0" :noStyling="true" classes="step step-0">
        <h3>The next decade is crucial</h3>
        <p>Compared to the average investment volumes observed from 2017-2019, annual average investments over the next 10 years need to be considerably scaled up for achieving ambitious mitigation targets. Currently pledged targets for 2030 (so called Nationally Determined Contributions, NDC, see emissions gap module) already imply an increase of yearly investments, but cost-efficiently achieving the 2°C or even 1.5°C target requires an even stronger increase.</p>
        <p>Increased investments don't imply equally increased costs to consumers. Many of the investments required actually allow for future savings, by limiting energy bills (as in the case of efficiency investments), or by providing power generation without fuel costs (as in the case of investments into renewable power generation). The current situation of high public spending via COVID-19 recovery packages offers a great way of mobilizing these sums, which are only a small percentage of envisioned total recovery packages [refer to Andrijevic et al. 2020] </p>
        <p>Let's now look at the composition of these total energy investments, and what implications climate targets have for each of them </p>
      </IntersectionObserver>
      <IntersectionObserver :step="1" :noStyling="true" classes="step step-1 step-trigger">
        <div />
      </IntersectionObserver>
      <IntersectionObserver :step="2" :noStyling="true" classes="step step-2">
        <h3>Reducing fossil investments</h3>
        <p>While the fossil sector, and especially the extraction side has still captured the largest share of energy investments in the past years, investments into fossil extraction needs to be reduced considerably in order to achieve the Paris Agreement climate targets and avoid stranded assets. While <Variable variable="oil-and-gas">Oil and Gas</Variable> investments decrease markedly, they don't fall to zero, as also declining production volumes still require some investments into existing fields. <Variable variable="coal">Coal</Variable> investments decrease even stronger in most models, as coal is the fossil fuel with the higher emission intensity and the lowest specific value. Furthermore, it's mostly used in power generation, where low-carbon alternatives are most mature and expanding rapidly. Therefore, investments into <Variable variable="fossil-fuels">Fossil Fuels</Variable> also decrease very strongly, with investments into new coal-fired power plants ending immediately in mitigation scenarios, and only some gas generation projects still being pursued in some regions.</p>
        <BarInvestmentsChart
          :variables="GROUP_FOSSILS"
          :scenarios="['NDC', '2C', '1.5C']"
          :limit="1">
          <template v-slot:header>
            Change of investments
          </template>
          <template v-slot:caption>
            Figure 1. Relative changes of different fossil investment components.
          </template>
        </BarInvestmentsChart>
        <p> Whether Carbon capture and storage offers a way for fossil fuels to retain it's place in the transition to a low-carbon energy system is uncertain, but some models foresee increased investments into <Variable variable="hydrogen-fossil">Hydrogen - Fossil</Variable> with CCS in ambitious mitigation scenarios.</p>
      </IntersectionObserver>
      <IntersectionObserver :step="3" :noStyling="true" classes="step step-3">
        <h3>Upscaling low-carbon investments</h3>
        <p>Electrification is a key mitigation strategy, but for it to be effective, power generation needs to be decarbonized quickly. Therefore, ambitious mitigation scenarios sees all sources of low-carbon energy to expand, requiring strongly increasing investments in the next decade.</p>
        <p>The two low-carbon sources standing out however are <Variable variable="wind">Wind</Variable> and <Variable variable="solar">Solar</Variable>: Due to recent cost reductions, they quickly become universally the cheapest form of electricity as soon as CO2 is priced, and thanks to their granular nature and can be scaled up rapidly in all world regions. </p>
        <BarCompactAbsolute
          :variables="GROUP_NON_FOSSILS"
          :scenarios="['NDC', '2C', '1.5C']">
          <template v-slot:header>
            Change in something
          </template>
          <template v-slot:caption>
            Figure 2. Absolute changes in something
          </template>
        </BarCompactAbsolute>
        <p>The low-carbon power generation technologies <Variable variable="nuclear">Nuclear</Variable> and hydro and geothermal, included in <Variable variable="other-renewables">other renewables</Variable> currently still provide the highest share of low-carbon electricity, but face different hurdles that limit their expansion and thus see more moderate increases of investment over the next 10 years. </p>
        <p>Not only low-carbon power generation is being scaled up, but also low-carbon fuels via <Variable variable="hydrogen-non-fossil">Hydrogen - Non-fossil</Variable> and <Variable variable="bioenergy">Bioenergy</Variable>.</p>
      </IntersectionObserver>
      <IntersectionObserver :step="4" :noStyling="true" classes="step step-4">
        <h3>Increased role of networks, CCS, and efficiency</h3>
        <p>Decarbonized power systems need to expand <Variable variable="transmission-and-distribution">Transmission and Distribution</Variable> and <Variable variable="storage">Storage</Variable>, to balance demand and supply from increasing shares of variable renewables. </p>
        <p>Carbon capture and storage investments (<Variable variable="ccs">CCS</Variable>) are needed both for extending the usage of fossil fuels in some applications (industry, hydrogen), but also enable carbon dioxide removal (CDR) via bioenergy with CCS (BECCS). Scaling up investments into these options starts from a much lower base, as only demonstration projects exist so far. The in absolute terms moderate upscaling is however an important component for gathering experience and knowledge, and thus being able to better understand viable combinations of residual emissions and CDR in future net-zero energy systems.</p>
        <p>The last but very clearly not the least component of an investment strategy to move towards ambitious climate targets is a considerably increase in investments for <Variable variable="energy-efficiency">Energy Efficiency</Variable>. These investments allow for immediate emission reductions of sectors before their energy supply is decarbonized, and also are a crucial component for long-term sustainable energy systems with much reduced sustainability trade-offs inherent to all energy technologies [cite Grubler et al. 2018, Bertram et al. 2018]</p>
        <BarCompactAbsolute
          :variables="GROUP_OTHERS"
          :scenarios="['NDC', '2C', '1.5C']">
          <template v-slot:header>
            Change in something
          </template>
          <template v-slot:caption>
            Figure 3. Relative changes in something
          </template>
        </BarCompactAbsolute>
      </IntersectionObserver>
      <IntersectionObserver :step="5" :noStyling="true" classes="step step-5 step-trigger">
        <div />
      </IntersectionObserver>
      <IntersectionObserver :step="6" :noStyling="true" classes="step step-6">
        <h3>Regional detail</h3>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. <span class="type-other">others</span> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      </IntersectionObserver>
      <IntersectionObserver :step="7" :noStyling="true" classes="step step-7 step-trigger">
        <div />
      </IntersectionObserver>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IntersectionObserver from 'library/src/components/IntersectionObserver'
import BarInvestmentsChart from '~/components/BarInvestmentsChart'
import StackedInvestments from '~/components/StackedInvestments'
import BarCompactAbsolute from '~/components/ChartCompactAbsolute/Chart'
import Variable from '~/components/Helper/Variable'
import { GROUP_FOSSILS, GROUP_NON_FOSSILS, GROUP_OTHERS } from '~/store/config'

export default {
  data: () => {
    return {
      GROUP_FOSSILS, GROUP_NON_FOSSILS, GROUP_OTHERS
    }
  },
  components: {
    IntersectionObserver,
    BarInvestmentsChart,
    StackedInvestments,
    BarCompactAbsolute,
    Variable
  },
  computed: {
    ...mapGetters([
      'relativeValues'
    ])
  },
  methods: {
    ...mapActions([
      'loadInvestments',
      'changeStep'
    ])
  },
  mounted () {
    this.$on('step', (step) => {
      this.changeStep(step)
    })
  }
}
</script>

<style lang="scss">

.section--investment {
  .graphic {
    position: sticky;
    width: 100%;
    height: 100vh;
    top: 0;
    // top: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .steps {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 30vh;
    margin: 20vh 0;
    pointer-events: none;

    & > * {
      pointer-events: all;
    }
    // We need this for the chart in the background
    position: relative;

    .vis {
      // position: absolute;
      // width: 100%;
    }

    .step:not(.step-trigger) {
      border: 1px solid #f2f2f2;
      background-color: rgba(255, 255, 255, 0.96);
      padding: 1rem;
    }

    @mixin place-left() {
      grid-column-start: 1;
      grid-column-end: 3;
    }

    @mixin place-right() {
      grid-column-start: 5;
      grid-column-end: 7;
    }

    .step-0 {
      grid-row-start: 1;
      @include place-right();
    }

    .step-1 { // Trigger
      width: 0px;
      grid-row-start: 2;
      height: 40vh;
    }

    .step-2 {
      grid-row-start: 3;
      @include place-right();
    }

    .step-3 {
      grid-row-start: 4;
      @include place-left();
    }

    .step-4 {
      grid-row-start: 5;
      @include place-left();
    }

    .step-5 { // Trigger
      width: 0px;
      grid-row-start: 6;
      height: 40vh;
    }

    .step-6 {
      grid-row-start: 7;
      @include place-right();
    }

    .step-7 { // Trigger
      width: 0px;
      grid-row-start: 8;
      height: 40vh;
    }
  }
}

</style>
