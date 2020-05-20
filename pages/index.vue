<template>
  <div>
    <SensesMenu message="Work in Progress"/>
    <div class="container">
      <div class="wrapper">
        <h1>Investment Opportunities and Alignment</h1>
        <ul>
          <li>how investments consistent with the Paris Agreement Long-term target look like</li>
          <li>the investments of today determine to a large extent the emissions of tomorrow</li>
        </ul>
        <img src="graphic.png">
        <small>McCollum, D.L., Zhou, W., Bertram, C. et al. Energy investment needs for fulfilling the Paris Agreement and achieving the Sustainable Development Goals. Nat Energy 3, 589–599 (2018). </small>
      </div>
      <StackedInvestments />
      <BarInvestments />
      <div class="wrapper margin">
        <h2>Trade-off curves for single technologies</h2>
        <img src="graphic-2.png">
        <small>McCollum, D.L., Zhou, W., Bertram, C. et al. Energy investment needs for fulfilling the Paris Agreement and achieving the Sustainable Development Goals. Nat Energy 3, 589–599 (2018). </small>
      </div>
      <Options />
      <SensesMeta id="investment-opportunities"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SensesMeta from 'library/src/components/SensesMeta.vue'
import SensesMenu from 'library/src/components/SensesMenu.vue'
import StackedInvestments from '~/components/StackedInvestments'
import BarInvestments from '~/components/BarInvestments'
import Options from '~/components/Options'

export default {
  components: {
    StackedInvestments,
    BarInvestments,
    Options,
    SensesMenu,
    SensesMeta
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
    padding: $spacing * 4 $spacing * 2;
    max-width: 1200px;

    .wrapper {
      margin-bottom: $spacing * 8;

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
  }

</style>
