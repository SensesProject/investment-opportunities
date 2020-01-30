<template>
  <div class="container">
    <StackedInvestments />
    <Options />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StackedInvestments from '~/components/StackedInvestments'
import Options from '~/components/Options'

export default {
  components: {
    StackedInvestments,
    Options
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
