<template>
  <rect
    :x="0"
    :width="width"
    :height="groupHeight"
    :class="[id, label]"
    :y="y"
    :style="{ fill: color, transform: `rotate(${isRotated ? -90 : 0}deg)` }"
  />
</template>

<script>
export default {
  props: ['width', 'groupHeight', 'id', 'label', 'y', 'color', 'isRotated']
}
</script>
