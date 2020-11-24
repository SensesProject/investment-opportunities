<template>
  <g class="diff--more">
    <rect
      :x="x"
      :width="width"
      :height="height"
      :y="y"
      :style="{ fill: 'rgba(255, 255, 255, 0.8)' }"
    />
    <rect
      :x="x + width"
      :width="widthReference - width"
      :height="height"
      :style="{ fill: color }"
      :y="y"
    />
    <rect
      :x="x + width"
      :width="widthReference - width"
      :height="height"
      :y="y"
      :style="{ fill: 'url(#diagonal-stripe-more)' }"
    />
  </g>
</template>

<script>
export default {
  props: ['x', 'width', 'height', 'y', 'widthReference', 'color']
}
</script>