<template>
  <text
    :x="0"
    :style="`transform: translateX(${labelX}px)`"
    :y="labelY"
    dominant-baseline="hanging"
    :class="['label', { isVisible: isVisible }]"
  ><tspan ref="label">{{ showDifference ? diff : value }}</tspan></text>
</template>

<script>
export default {
  props: ['labelX', 'labelY', 'height', 'diff', 'value', 'showDifference', 'width', 'isVisible'],
  mounted () {
    this.checkVisibility()
  },
  updated () {
    this.checkVisibility()
  },
  methods: {
    checkVisibility () {
      const { label } = this.$refs
      const { width } = label.getBBox()
      label.style.opacity = width < this.width ? 1 : 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .label {
    font-size: $font-size-small;
    fill: getColor(gray, 60);
    font-family: $font-sans;
    opacity: 0;
    transition: opacity $transition-animation / 4, transform $transition-animation;

    &.isVisible {
      opacity: 1;
      transition: opacity $transition-animation;
      transition-delay: $transition-animation;
    }

    tspan {
      opacity: 0;
      transition: opacity $transition-animation / 4;
    }
  }
</style>
