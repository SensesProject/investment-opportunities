<template>
  <span :class="`variable variable--${variable}`"><slot /></span>
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
    font-weight: bold;
    white-space: nowrap;

    &:before {
      content: '';
      width: 0.6em;
      height: 0.6em;
      margin-bottom: 0.05em;
      margin-right: 0.3em;
      display: inline-block;
      border-radius: 50%;
    }

    &.variable--coal {
      &:before {
        background-color: #F0A1BA;
      }
    }

    &.variable--hydrogen-fossil {
      &:before {
        background-color: #FFBD9A;
      }
    }

    &.variable--oil-and-gas {
      &:before {
        background-color: #E67887;
      }
    }

    &.variable--fossil-fuels {
      &:before {
        background-color: #FAA99C;
      }
    }

    &.variable--nuclear {
      &:before {
        background-color: #B8AEFF;
      }
    }

    &.variable--bioenergy {
      &:before {
        background-color: #A2E7C0;
      }
    }

    &.variable--hydrogen-non-fossil {
      &:before {
        background-color: #B6D68C;
      }
    }

    &.variable--solar {
      &:before {
        background-color: #FFE7A0;
      }
    }

    &.variable--wind {
      &:before {
        background-color: #A3D1EA;
      }
    }

    &.variable--other-renewables {
      &:before {
        background-color: #DED68E;
      }
    }

    &.variable--transmission-and-distribution {
      &:before {
        background-color: #D8D8E4;
      }
    }

    &.variable--energy-efficiency {
      &:before {
        background-color: #AC9BD9;
      }
    }

    &.variable--ccs {
      &:before {
        background-color: #BAD2EB;
      }
    }
  }

</style>
