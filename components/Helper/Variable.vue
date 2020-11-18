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

    i {
      content: '';
      width: 0.6em;
      height: 0.6em;
      margin-bottom: 0.05em;
      margin-right: 0.3em;
      border-radius: 50%;
      display: inline-block;
    }

    &.variable--coal {
      i {
        background-color: #F0A1BA;
      }
    }

    &.variable--hydrogen-fossil {
      i {
        background-color: #FFBD9A;
      }
    }

    &.variable--oil-and-gas {
      i {
        background-color: #E67887;
      }
    }

    &.variable--fossil-fuels {
      i {
        background-color: #FAA99C;
      }
    }

    &.variable--nuclear {
      i {
        background-color: #B8AEFF;
      }
    }

    &.variable--bioenergy {
      i {
        background-color: #A2E7C0;
      }
    }

    &.variable--hydrogen-non-fossil {
      i {
        background-color: #B6D68C;
      }
    }

    &.variable--solar {
      i {
        background-color: #FFE7A0;
      }
    }

    &.variable--wind {
      i {
        background-color: #A3D1EA;
      }
    }

    &.variable--other-renewables {
      i {
        background-color: #DED68E;
      }
    }

    &.variable--transmission-and-distribution {
      i {
        background-color: #D8D8E4;
      }
    }

    &.variable--energy-efficiency {
      i {
        background-color: #AC9BD9;
      }
    }

    &.variable--ccs {
      i {
        background-color: #BAD2EB;
      }
    }

    &.variable--storage {
      i {
        background-color: #A7DBD1;
      }
    }
  }

</style>
