<template>
  <section class="section section--investment">
    <div class="graphic">
      <StackedInvestments />
    </div>
    <div class="steps">
      <IntersectionObserver :step="0" :noStyling="true" classes="step step-0">
        <h3>The next decade is crucial</h3>
        <p>Compared to the average investment volumes observed from 2017–2019, annual average investments over the next 10 years need to be considerably scaled up for achieving ambitious mitigation targets. Currently pledged targets for 2030 (so called Nationally Determined Contributions, NDC, see <a href="https://climatescenarios.org/emissions-gap/" target="_blank">emissions gap module</a>) already imply an increase of yearly investments, but cost-efficiently achieving the 2°C or even 1.5°C target requires an even stronger increase.</p>
        <p>Increased investments don’t imply equally increased costs to consumers. Many of the investments required actually allow for future savings, by limiting energy bills (as in the case of efficiency investments), or by providing power generation without fuel costs (as in the case of investments into renewable power generation). The current situation of high public spending via COVID-19 recovery packages offers a great way of mobilizing these sums, which are only a small percentage of envisioned <a v-tooltip="{ content: '<p>Andrijevic, M., Schleussner, C., Gidden, M. et al. “COVID-19 recovery funds dwarf clean energy investment needs.” Science 16 Oct 2020: Vol. 370, Issue 6514, pp. 298-300.</p>'}" href="https://doi.org/10.1126/science.abc9697" target="_blank">total recovery packages</a>.</p>
        <p>Let’s now look at the composition of these total energy investments, and what implications climate targets have for each of them </p>
      </IntersectionObserver>
      <IntersectionObserver :step="1" :noStyling="true" classes="step step-1 step-trigger">
        <div />
      </IntersectionObserver>
      <IntersectionObserver :step="2" :noStyling="true" classes="step step-2">
        <h3>Reducing fossil investments</h3>
        <p>While the fossil sector, and especially the extraction side has still captured the largest share of energy investments in the past years, investments into fossil extraction needs to be reduced considerably in order to achieve the Paris Agreement climate targets and avoid stranded assets. While <Variable variable="oil-and-gas">Oil and Gas</Variable> investments decrease markedly, they don't fall to zero, as also declining production volumes still require some investments into existing fields. <Variable variable="coal">Coal</Variable> investments decrease even stronger in most models, as coal is the fossil fuel with the higher emission intensity and the lowest specific value. Furthermore, it's mostly used in power generation, where low-carbon alternatives are most mature and expanding rapidly. Therefore, investments into <Variable variable="fossil-fuels">Fossil Power Generation</Variable> also decrease very strongly, with investments into new coal-fired power plants ending immediately in mitigation scenarios, and only some gas generation projects still being pursued in some regions.</p>
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
        <p> Whether Carbon capture and storage offers a way for fossil fuels to retain it's place in the transition to a low-carbon energy system is uncertain, but some models foresee increased investments into <Variable variable="hydrogen-fossil">Hydrogen (fossil)</Variable> with CCS in ambitious mitigation scenarios.</p>
      </IntersectionObserver>
      <IntersectionObserver :step="3" :noStyling="true" classes="step step-3">
        <h3>Upscaling low-carbon investments</h3>
        <p>Electrification is a key mitigation strategy, but for it to be effective, power generation needs to be decarbonized quickly. Therefore, ambitious mitigation scenarios sees all sources of low-carbon energy to expand, requiring strongly increasing investments in the next decade.</p>
        <p>The two low-carbon sources standing out however are <Variable variable="wind">Wind</Variable> and <Variable variable="solar">Solar</Variable>: Due to recent cost reductions, they quickly become universally the cheapest form of electricity as soon as CO<sub>2</sub> is priced, and thanks to their granular nature and can be scaled up rapidly in all world regions. </p>
        <BarCompactAbsolute
          :variables="GROUP_NON_FOSSILS"
          :scenarios="['NDC', '2C', '1.5C']">
          <template v-slot:header>
            Change compared to current investments
          </template>
          <template v-slot:caption>
            Figure 2. Absolute changes in average yearly investments in power generation technologies (in bn US$/yr).
          </template>
        </BarCompactAbsolute>
        <p>The low-carbon power generation technologies <Variable variable="nuclear">Nuclear</Variable> and hydro and geothermal, included in <Variable variable="other-renewables">other renewables</Variable> currently still provide the highest share of low-carbon electricity, but face different hurdles that limit their expansion and thus see more moderate increases of investment over the next 10 years. </p>
        <p>Not only low-carbon power generation is being scaled up, but also low-carbon fuels via <Variable variable="hydrogen-non-fossil">Hydrogen (non-fossil)</Variable> and <Variable variable="bioenergy">Bioenergy</Variable>.</p>
      </IntersectionObserver>
      <IntersectionObserver :step="4" :noStyling="true" classes="step step-4">
        <h3>Increased role of networks, CCS, and efficiency</h3>
        <p>Decarbonized power systems need to expand <Variable variable="transmission-and-distribution">Transmission and Distribution</Variable> and <Variable variable="storage">Storage</Variable>, to balance demand and supply from increasing shares of variable renewables. </p>
        <p>Carbon capture and storage investments (<Variable variable="ccs">CCS</Variable>) are needed both for extending the usage of fossil fuels in some applications (industry, hydrogen), but also enable carbon dioxide removal (CDR) via bioenergy with CCS (BECCS). Scaling up investments into these options starts from a much lower base, as only demonstration projects exist so far. The in absolute terms moderate upscaling is however an important component for gathering experience and knowledge, and thus being able to better understand viable combinations of residual emissions and CDR in future net-zero energy systems.</p>
        <p>The last but very clearly not the least component of an investment strategy to move towards ambitious climate targets is a considerably increase in investments for <Variable variable="energy-efficiency">Energy Efficiency</Variable>. These investments allow for <a v-tooltip="{ content: '<p>Grubler, Arnulf, Charlie Wilson, Nuno Bento, Benigna Boza-Kiss, Volker Krey, David L. McCollum, Narasimha D. Rao, et al. “A Low Energy Demand Scenario for Meeting the 1.5 °C Target and Sustainable Development Goals without Negative Emission Technologies.” Nature Energy 3, no. 6 (June 2018): 515–27.'}" href="https://doi.org/10.1038/s41560-018-0172-6" target="_blank">immediate emission reductions</a> of sectors before their energy supply is decarbonized, and also are a crucial component for long-term sustainable energy systems with much <a v-tooltip="{ content: '<p>Bertram, Christoph, Gunnar Luderer, Alexander Popp, Jan Christoph Minx, William F. Lamb, Miodrag Stevanović, Florian Humpenöder, Anastasis Giannousakis, and Elmar Kriegler. “Targeted Policies Can Compensate Most of the Increased Sustainability Risks in 1.5 °C Mitigation Scenarios.” Environmental Research Letters 13, no. 6 (2018): 064038.'}" href="https://doi.org/10.1088/1748-9326/aac3ec" target="_blank">reduced sustainability trade-offs</a> inherent to all energy technologies.</p>
        <BarCompactAbsolute
          :variables="GROUP_OTHERS"
          :scenarios="['NDC', '2C', '1.5C']">
          <template v-slot:header>
            Changes compared to current investments
          </template>
          <template v-slot:caption>
            Figure 3. Absolute change in average yearly investments in power systems, CCS and efficiency (in bn US$/yr).
          </template>
        </BarCompactAbsolute>
      </IntersectionObserver>
      <IntersectionObserver :step="5" :noStyling="true" classes="step step-5 step-trigger">
        <div />
      </IntersectionObserver>
      <IntersectionObserver :step="6" :noStyling="true" classes="step step-6">
        <h3>Regional data</h3>
        <p>The regional picture mostly is in line with the global picture. Given their disproportionate weight in terms of economic output, and hence energy demand, the two regions of “<Region region="R5OECD90+EU">OECD+EU</Region>” and “<Region region="R5ASIA">Asia</Region>” show the highest investment numbers in most categories.</p>
        <p>Exceptions include the current investments into gas and oil extraction with the second largest contribution from “<Region region="R5MAF">Middle East and Africa</Region>”, and the investments into bioenergy under ambitous mitigation in “<Region region="R5LAM">Latin America</Region>”, both caused by the important role as exporters of the respective energy forms.</p>
      </IntersectionObserver>
      <IntersectionObserver :step="7" :noStyling="true" classes="step step-7 step-trigger">
        <div />
      </IntersectionObserver>
      <IntersectionObserver :step="8" :noStyling="true" classes="step step-8">
        <Explore />
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
import Explore from '~/components/Explore'
import Variable from '~/components/Helper/Variable'
import Region from '~/components/Helper/Region'
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
    Variable,
    Region,
    Explore
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
@import "~@/assets/style/global";

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
    margin: 20vh 0 0;
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
      background-color: rgba(255, 255, 255, 0.94);
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
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

    @mixin place-full() {
      grid-column-start: 1;
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

    .step-8 {
      grid-row-start: 9;
      @include place-full();
      // border-color: $color-neon !important;
      box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.05) !important;
      margin-bottom: 5vh;
    }
  }
}

</style>
