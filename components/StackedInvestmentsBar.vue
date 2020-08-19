<template>
  <rect
    :x="0"
    :width="width"
    :height="groupHeight"
    :class="{ hasHighlight: highlight.length, isHighlighted: highlight.includes(variable) }"
    :data-id="variable"
    :y="y"
    :style="{ fill: color, transform: `rotate(${isRotated ? -90 : 0}deg)` }"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['width', 'groupHeight', 'id', 'y', 'color', 'isRotated', 'variable'],
  computed: {
    ...mapState({
      highlight: state => state.settings.highlight
    })
  }
}
</script>
