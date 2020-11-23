<template>
  <section class="section wrapper section--methodology">
    <h4>Methodology</h4>
    <p>This learn module is based on scenario data from the <a href="https://www.cd-links.org/" target="_blank">CD-Links study</a>, as presented in the paper <a v-tooltip="{ content: '<p>McCollum, David L., Wenji Zhou, Christoph Bertram, Harmen-Sytze de Boer, Valentina Bosetti, Sebastian Busch, Jacques Després, et al. “Energy Investment Needs for Fulfilling the Paris Agreement and Achieving the Sustainable Development Goals.” Nature Energy 3, no. 7 (July 2018): 589–99.</p>'}" href="https://doi.org/10.1038/s41560-018-0179-z." target="_blank">McCollum et al. 2018</a>. Historic investment data (2017–2019) is based on the IEA’s <a href="https://www.iea.org/reports/world-energy-investment-2020" target="_blank">World Energy Investment 2020 report</a>, which is downscaled to individual technologies and countries by using BP’s <a href="https://www.bp.com/en/global/corporate/energy-economics/statistical-review-of-world-energy.html" target="_blank">2020 data</a> as weights.</p>
    <p>Given that especially the renewables assumption in the CD-Links study are somewhat outdated for many of the models (less so for the REMIND-MAgPIE model which is therefore shown as default), we plan to update the learn module with new scenario data from the <a href="http://www.engage-climate.org/" target="_blank">ENGAGE project</a> that will become available during Q1 or Q2 of 2021. Some of the preprocessing of the data can be seen in this <a href="https://github.com/SensesProject/investment-opportunities/blob/master/preprocessing/Investment%20Opportunities%20and%20Alignment.ipynb" target="_blank">Jupyter Notebook</a>.</p>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .section {
    border-top: 1px solid #f2f2f2;
    padding-top: 4rem;

    p {
      @include text-3();
      max-width: none;
      line-height: 1.6;
    }

    h4 {
      margin-bottom: 0.5rem;
    }
  }

</style>
