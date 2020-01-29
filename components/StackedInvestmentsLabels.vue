<template>
  <div class="labels" :style="{ 'grid-template-columns': widths, 'width': `calc(100% - ${gaps}px)`, 'grid-column-gap': `${gap}px` }">
    <section :style="{ 'grid-column-end': `span ${groups[0].length}` }">
      <h4>Energy Efficiency</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.</p>
    </section>
    <section :style="{ 'grid-column-end': `span ${groups[1].length}` }">
      <h4>CSS, T&D and Storage</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.</p>
    </section>
    <section :style="{ 'grid-column-end': `span ${groups[2].length}` }">
      <h4>Nuclear & Bioenergy</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.</p>
    </section>
    <section :style="{ 'grid-column-end': `span ${groups[3].length}` }">
      <h4>Fossil Fuels</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.</p>
    </section>
  </div>
</template>

<script>
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale'
import { range } from 'd3-array'
import { map, groupBy, sum, values, filter, get } from 'lodash'
import { mapGetters } from 'vuex'

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
      let x0 = 0
      return map(this.groups, (group) => {
        return map(group, key => {
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

    section {
      border-top: 2px solid getColor(gray, 90);
    }

    p {
      font-size: 0.8rem;
    }
  }

</style>
