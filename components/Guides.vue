<template>
  <g class="guides">
    <line
      v-for="(x, i) in guides"
      :x1="x + 0.5"
      :x2="x"
      :y1="50"
      :y2="height - 50"
      class="guide"
      :class="{ isFirst: i === 0 }"
      :stroke-dasharray="i ? '4 1' : 0" />
  </g>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['height'],
  computed: {
    ...mapState({
      guides: state => state.guides.guides
    })
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/global";

  .guide {
    stroke: #eee;

    &.isFirst {
      stroke: #d7d7d7;
    }
  }
</style>
