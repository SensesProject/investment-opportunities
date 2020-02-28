<template>
  <div>
    <SensesMenu message="Work in Progress"/>
    <div class="container">
      <StackedInvestments />
      <Options />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StackedInvestments from '~/components/StackedInvestments'
import Options from '~/components/Options'
import SensesMenu from 'library/src/components/SensesMenu.vue'

export default {
  components: {
    StackedInvestments,
    Options,
    SensesMenu
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
    padding: $spacing * 2;
  }

</style>
