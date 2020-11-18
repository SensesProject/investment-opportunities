<template>
  <div v-if="model !== 'median' && model !== 'REMIND-MAgPIE'" class="warning">
    <span>The CD-Links scenarios of model {{ model }} are from 2017 and do not fully reflect recent cost reductions for wind and solar. This should to be taken into account when analysing the investments into the power sector in those scenarios.</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      model: state => state.settings.model
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .warning {
    background-color: $color-neon;
    top: 8vh;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 500px;
    padding: $spacing / 4;
    // border: 1px solid $color-yellow;
    border-radius: $border-radius;
    font-size: $font-size-default;
    color: #fff;
  }

</style>
