<template>
  <main class="container">
    <SectionHeader />
    <SectionIntroduction />
    <SectionInvestment />
    <SectionConclusion />
    <SectionMethodology />
    <Warning />
    <SensesMeta id="investment-opportunities"/>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import SensesMeta from 'library/src/components/SensesMeta.vue'
import SectionHeader from '~/sections/SectionHeader'
import SectionIntroduction from '~/sections/SectionIntroduction'
import SectionInvestment from '~/sections/SectionInvestment'
import SectionConclusion from '~/sections/SectionConclusion'
import SectionMethodology from '~/sections/SectionMethodology'
import Warning from '~/components/Warning'

export default {
  components: {
    SectionHeader,
    SectionIntroduction,
    SectionInvestment,
    SectionConclusion,
    SectionMethodology,
    SensesMeta,
    Warning
  },
  computed: {
    ...mapState({
      step: state => state.settings.step
    }),
    ...mapGetters([
      'relativeValues'
    ])
  },
  created () {
    this.loadInvestments()
  },
  mounted () {
    this.$on('step', (step) => {
      this.changeStep(step)
    })
  },
  methods: {
    ...mapActions([
      'loadInvestments',
      'changeStep'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .container {
    .wrapper {
      &.margin {
        margin-top: $spacing * 8;
      }

      ul {
        margin: $spacing 0 0 $spacing;
      }

      img {
        margin-top: $spacing;
        width: 100%;
      }
    }

    .investment {
      width: 100%;
      min-height: 500px;
      position: relative;

      .text {
        z-index: $z-index-text;
      }

      & > .text {
        background-color: rgba(255, 255, 255, 0.95);

        &.center {
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        &.right {
          width: 50%;
          margin-left: 50%;
          z-index: 10;
          position: relative;
        }
        &.left {
          width: 50%;
          margin-right: 50%;
          z-index: 10;
          position: relative;
        }
      }
    }
  }

</style>
