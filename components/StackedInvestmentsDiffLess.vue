<template>
  <g>
    <rect
      :x="0"
      :width="marker"
      :height="groupHeight"
      :y="y"
      :style="{ fill: 'rgba(255, 255, 255, 0.8)' }"
    />
    <line
      :x1="x + marker"
      :x2="x + marker"
      :y1="y"
      :y2="groupHeight"
      class="more"
    />
  </g>
</template>

<script>
export default {
  props: ['marker', 'x', 'y', 'groupHeight']
}
</script>
