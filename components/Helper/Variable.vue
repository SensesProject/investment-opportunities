<template>
  <span :class="`variable variable--${variable}`"><i /><strong><slot /></strong></span>
</template>

<script>
export default {
  props: ['variable']
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  span.variable {
    font-size: 0.95em;
    text-transform: uppercase;
    letter-spacing: 0.01em;
    // display: inline-block;
    white-space: nowrap;

    strong {
      white-space: normal;
      font-weight: bold;
    }
  }

</style>
