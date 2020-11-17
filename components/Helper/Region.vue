<template>
  <span :class="`region region--${region}`" v-tooltip="{ content: tooltip }"><slot /></span>
</template>

<script>
import { longScenario } from '~/assets/js/utils.js'

export default {
  props: ['region'],
  computed: {
    tooltip () {
      return longScenario(this.region)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  span.region {
    text-decoration: underline;
    text-decoration-style: dotted;
    text-decoration-color: $color-neon;
    text-decoration-thickness: 2px;
  }

</style>
