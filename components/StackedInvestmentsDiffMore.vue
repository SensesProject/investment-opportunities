<template>
  <g>
    <rect
      :x="0"
      :width="width"
      :height="groupHeight"
      :y="y"
      :style="{ fill: 'rgba(255, 255, 255, 0.8)' }"
    />
    <rect
      v-if="marker > width"
      :x="0 + width"
      :width="marker - width"
      :height="groupHeight"
      :style="{ fill: color }"
      :y="y"
    />
    <rect
      v-if="marker > width"
      :x="0 + width"
      :width="marker - width"
      :height="groupHeight"
      :y="y"
      :style="{ fill: 'url(#diagonal-stripe-more)' }"
    />
    <line
      :x1="0 + width"
      :x2="0 + width"
      :y1="y"
      :y2="groupHeight"
      class="more"
    />
  </g>
</template>

<script>
export default {
  props: ['x', 'width', 'groupHeight', 'y', 'marker', 'color']
}
</script>
