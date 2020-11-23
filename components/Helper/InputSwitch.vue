<template>
  <svg class="switch" :class="{ disabled }" @click="$emit('input', !value)">
    <rect
      x="1"
      y="1"
      :class="{ isActive: value }"
      width="26"
      height="14"
      rx="7"
      ry="7" />
    <circle
      cy="8"
      cx="8"
      :class="{ isActive: value }"
      r="5" />
  </svg>
</template>

<script>
export default {
  props: ['value', 'disabled']
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .switch {
    width: 28px;
    height: 16px;
    cursor: pointer;

    rect {
      // stroke-width: 10px;
      transition: fill 0.3s, stroke 0.3s;
      fill: $color-pale-gray;
      stroke: $color-pale-gray;

      &:hover {
        fill: $color-light-gray;
      }

      &.isActive {
        fill: $color-neon;
        stroke: getColor(neon, 45);

        &:hover {
          fill: getColor(neon, 45);
        }
      }
    }

    circle {
      transition: transform 0.3s;
      transform: translate(0);
      fill: $color-white;

      &.isActive {
        transform: translate(12px);
      }
    }

    &.disabled {
      pointer-events: none;

      rect {
        fill: $color-pale-gray;

        &.isActive {
          fill: getColor(neon, 100);
          stroke: getColor(neon, 100);
        }
      }
    }
  }

</style>
