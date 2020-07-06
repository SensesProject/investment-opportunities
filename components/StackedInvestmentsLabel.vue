<template>
  <text
    ref="label"
    :x="0"
    :style="`transform: translateX(${x}px)`"
    :y="y + height / 2"
    dominant-baseline="hanging"
    class="label"
  >{{ showDifference ? diff : value }}</text>
</template>

<script>
export default {
  props: ['x', 'y', 'height', 'diff', 'value', 'showDifference'],
  updated () {
    const { label } = this.$refs
    const { width } = label.getBBox()
    label.style.opacity = width < this.widths ? 1 : 0
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/global";

  .label {
    font-size: $font-size-small;
    fill: getColor(gray, 60);
    font-family: $font-sans;
    opacity: 0;
    transition: opacity 0.3s;
  }
</style>
