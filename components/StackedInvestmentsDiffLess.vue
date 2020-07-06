<template>
  <g>
    <rect
      :x="x"
      :width="marker"
      :height="height"
      :y="y"
      :style="{ fill: 'rgba(255, 255, 255, 0.8)' }"
    />
    <line
      :x1="x + marker"
      :x2="x + marker"
      :y1="y"
      :y2="height"
      class="more"
    />
  </g>
</template>

<script>
export default {
  props: ['marker', 'x', 'y', 'height']
}
</script>
