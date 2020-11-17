<template>
  <span :class="`region region--${region}`" v-tooltip="tooltip"><slot /></span>
</template>

<script>
import { longRegion } from '~/assets/js/utils.js'

export default {
  props: ['region'],
  computed: {
    tooltip () {
      const [title, list] = longRegion(this.region)
      return { content: `<header>${title}</header><p>${list}</p>` }
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
