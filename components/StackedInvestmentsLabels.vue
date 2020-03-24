<template>
  <div class="labels" :class="{ barStacked }" :style="{ 'grid-template-columns': widths, 'width': `calc(100% - ${gaps}px)`, 'grid-column-gap': `${gap}px` }">
    <section :style="{ 'grid-column-end': `span ${groups[0].length}` }">
      <h4>Energy Efficiency</h4>
      <p>This contains investments in technology that make the usage of energy more efficient.</p>
    </section>
    <section :style="{ 'grid-column-end': `span ${groups[1].length}` }">
      <h4>CCS, T&D and Storage</h4>
      <p>
        This includes
        <ul>
          <li>Carbon dioxide capture and storage</li>
          <li>Power Transmission & Distribution</li>
          <li>Energy storage</li>
        </ul>
      </p>
    </section>
    <section :style="{ 'grid-column-end': `span ${groups[2].length}` }">
      <h4>Nuclear & Bioenergy</h4>
      <p>
        This includes
        <ul>
          <li>Nuclear energy</li>
          <li>Bioenergy</li>
          <li>Non-bio renewables</li>
        </ul>
      </p>
    </section>
    <section :style="{ 'grid-column-end': `span ${groups[3].length}` }">
      <h4>Fossil Fuels</h4>
      <p>
        This includes
        <ul>
          <li>Fossil Fuels without Carbon dioxide capture and storage</li>
          <li>Fossil Fuels</li>
        </ul>
      </p>
    </section>
  </div>
</template>

<script>
import { map, sum, values, get } from 'lodash'
import { mapState } from 'vuex'

export default {
  props: ['extents', 'gap'],
  data: () => {
    return {
      groups: [
        ['Energy Efficiency'],
        ['CCS', 'Electricity - T&D and Storage'],
        ['Extraction and Conversion - Nuclear', 'Extraction and Conversion - Bioenergy', 'Electricity - Non-bio Renewables'],
        ['Electricity - Fossil Fuels w/o CCS', 'Extraction and Conversion - Fossil Fuels']
      ]
    }
  },
  computed: {
    ...mapState({
      barStacked: state => state.settings.barStacked
    }),
    total () {
      return sum(values(this.extents))
    },
    blocks () {
      return values(this.extents).length
    },
    gaps () {
      return (this.blocks - 1) * this.gap
    },
    widths () {
      return map(this.groups, (group) => {
        return map(group, (key) => {
          return `${100 / this.total * get(this.extents, key, 0)}%`
        }).join(' ')
      }).join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .labels {
    display: grid;
    // grid-column-gap: $spacing / 2;
    max-width: 100%;
    transition: opacity $transition-animation;
    opacity: 0;

    &.barStacked {
      opacity: 1;
    }

    section {
      border-top: 2px solid getColor(gray, 90);
    }

    p {
      font-size: 0.8rem;

      ul {
        margin-left: $spacing / 2;
      }
    }
  }

</style>
