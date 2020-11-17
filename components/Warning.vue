<template>
  <div class="warning" v-if="model !== 'median' && model !== 'REMIND-MAgPIE'">
    <span>The model {{ model }} is not Lorem ipsum dolor sit amet.</span>
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
