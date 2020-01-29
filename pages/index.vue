<template>
  <div class="container">
    <StackedInvestments />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Options from '~/components/Options'
import StackedInvestments from '~/components/StackedInvestments'

export default {
  components: {
    Options,
    StackedInvestments
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
