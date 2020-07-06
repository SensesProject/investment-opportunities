<template>
  <div>
    <SensesMenu message="Work in Progress"/>
    <main class="container">
      <header class="page-header header wrapper">
        <h1>Investment Opportunities and Alignment</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </header>
      <StackedInvestments />
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
  }

</style>
