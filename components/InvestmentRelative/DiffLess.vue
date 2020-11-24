<template>
  <g class="diff--less">
    <rect
      :x="x"
      :width="widthReference"
      :height="height"
      :y="y"
      :style="{ fill: 'rgba(255, 255, 255, 0.7)' }"
    />
  </g>
</template>

<script>
export default {
  props: ['widthReference', 'x', 'y', 'height']
}
</script>

<style scoped lang="scss">

  line {
    &.more {
      stroke: #fff;
      stroke-width: 2px;
      stroke-dasharray: 1px, 1px;
    }
  }

  .difference {
    rect, line {
      opacity: 1;
    }

    &.showDifference {
      rect, line {
        opacity: 1;
      }
    }
  }

</style>