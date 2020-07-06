<template>
  <g>
    <rect
      :x="x"
      :width="width"
      :height="height"
      :y="y"
      :style="{ fill: 'rgba(255, 255, 255, 0.8)' }"
    />
    <rect
      v-if="marker > width"
      :x="x + width"
      :width="marker - width"
      :height="height"
      :style="{ fill: color }"
      :y="y"
    />
    <rect
      v-if="marker > width"
      :x="x + width"
      :width="marker - width"
      :height="height"
      :y="y"
      :style="{ fill: 'url(#diagonal-stripe-more)' }"
    />
    <line
      :x1="x + width"
      :x2="x + width"
      :y1="y"
      :y2="height"
      class="more"
    />
  </g>
</template>

<script>
export default {
  props: ['x', 'width', 'height', 'y', 'marker', 'color']
}
</script>
