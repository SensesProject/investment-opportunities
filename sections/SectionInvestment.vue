<template>
  <section class="section section--investment">
    <div class="graphic">
      <StackedInvestments />
    </div>
    <div class="steps">
      <IntersectionObserver :step="0" :noStyling="true" classes="step step-0">
        <h3>No change without investing</h3>
        <p>Achieving targets require investments, no change without investing in it incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. <a href="https://google.de">link to science-based target type initiatives</a> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </IntersectionObserver>
      <IntersectionObserver :step="1" :noStyling="true" classes="step step-1 step-trigger">
        <div />
      </IntersectionObserver>
      <IntersectionObserver :step="2" :noStyling="true" classes="step step-2">
        <h3>Upscaling efficiency</h3>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. <span class="type-efficiency">efficiency</span> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <figure>
          <header>
            <h4>Relative changey differ</h4>
          </header>
          <BarInvestmentsChart
            :gap="20"
            :data="relativeValues"
            path="scenario"
            :options="[
              { scenario: 'NDC', variable: 'Oil and Gas' },
              { scenario: 'NDC', variable: 'Coal' },
              { scenario: 'NDC', variable: 'Electricity - Fossil Fuels w/o CCS' },
              { scenario: 'NDC', variable: 'Hydrogen - Fossil' },
              { scenario: '1.5C', variable: 'Oil and Gas' },
              { scenario: '1.5C', variable: 'Coal' },
              { scenario: '1.5C', variable: 'Electricity - Fossil Fuels w/o CCS' },
              { scenario: '1.5C', variable: 'Hydrogen - Fossil' },
              { scenario: '2C', variable: 'Oil and Gas' },
              { scenario: '2C', variable: 'Coal' },
              { scenario: '2C', variable: 'Electricity - Fossil Fuels w/o CCS' },
              { scenario: '2C', variable: 'Hydrogen - Fossil' }
            ]"
          />
          <figcaption>Figure 1. Something</figcaption>
        </figure>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      </IntersectionObserver>
      <IntersectionObserver :step="3" :noStyling="true" classes="step step-3">
        <h3>Upscaling low-carbon</h3>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. <span class="type-low">low-carbon</span> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <figure>
          <header>
            <h4>Relative changey differ</h4>
          </header>
          <BarInvestmentsChart
            :gap="20"
            :data="relativeValues"
            path="scenario"
            :options="[
              { scenario: 'NDC', variable: 'Extraction and Conversion - Nuclear' },
              { scenario: 'NDC', variable: 'Extraction and Conversion - Bioenergy' },
              { scenario: 'NDC', variable: 'Hydrogen - Non-fossil' },
              { scenario: 'NDC', variable: 'Energy Supply|Electricity|Solar' },
              { scenario: 'NDC', variable: 'Energy Supply|Electricity|Wind' },
              { scenario: 'NDC', variable: 'other renewables' },
              { scenario: '1.5C', variable: 'Extraction and Conversion - Nuclear' },
              { scenario: '1.5C', variable: 'Extraction and Conversion - Bioenergy' },
              { scenario: '1.5C', variable: 'Hydrogen - Non-fossil' },
              { scenario: '1.5C', variable: 'Energy Supply|Electricity|Solar' },
              { scenario: '1.5C', variable: 'Energy Supply|Electricity|Wind' },
              { scenario: '1.5C', variable: 'other renewables' },
              { scenario: '2C', variable: 'Extraction and Conversion - Nuclear' },
              { scenario: '2C', variable: 'Extraction and Conversion - Bioenergy' },
              { scenario: '2C', variable: 'Hydrogen - Non-fossil' },
              { scenario: '2C', variable: 'Energy Supply|Electricity|Solar' },
              { scenario: '2C', variable: 'Energy Supply|Electricity|Wind' },
              { scenario: '2C', variable: 'other renewables' }
            ]"
          />
          <figcaption>Figure 1. Something</figcaption>
        </figure>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      </IntersectionObserver>
      <IntersectionObserver :step="4" :noStyling="true" classes="step step-4">
        <h3>Downscaling fossils</h3>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. <span class="type-fossil">fossil fuel</span> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <figure>
          <header>
            <h4>Relative changey differ</h4>
          </header>
          <BarInvestmentsChart
            :gap="20"
            :data="relativeValues"
            path="scenario"
            :options="[
              { scenario: 'NDC', variable: 'Electricity - T&D and Storage' },
              { scenario: 'NDC', variable: 'Energy Efficiency' },
              { scenario: 'NDC', variable: 'CCS' },
              { scenario: '1.5C', variable: 'Electricity - T&D and Storage' },
              { scenario: '1.5C', variable: 'Energy Efficiency' },
              { scenario: '1.5C', variable: 'CCS' },
              { scenario: '2C', variable: 'Electricity - T&D and Storage' },
              { scenario: '2C', variable: 'Energy Efficiency' },
              { scenario: '2C', variable: 'CCS' }
            ]"
          />
          <figcaption>Figure 1. Something</figcaption>
        </figure>
      </IntersectionObserver>
      <IntersectionObserver :step="5" :noStyling="true" classes="step step-5">
        <h3>Others</h3>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. <span class="type-other">others</span> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      </IntersectionObserver>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IntersectionObserver from 'library/src/components/IntersectionObserver'
import BarInvestmentsChart from '~/components/BarInvestmentsChart'
import StackedInvestments from '~/components/StackedInvestments'

export default {
  components: {
    IntersectionObserver,
    BarInvestmentsChart,
    StackedInvestments
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
    console.log('Step', this.step)
    this.$on('step', (step) => {
      console.log({ step })
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
    grid-template-columns: repeat(5, 1fr);
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
      grid-column-start: 4;
      grid-column-end: 6;
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

    .step-5 {
      grid-row-start: 6;
      @include place-right();
    }
  }
}

</style>
