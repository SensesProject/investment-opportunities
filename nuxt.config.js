const { getHead } = require('library/src/assets/js/head.js')

export default {
  mode: 'spa',
  head: getHead({
    title: 'Investment Opportunities and Alignment',
    description: 'In this module, we illustrate how co-production techniques can be applied in combination with socioeconomic and impact scenarios to develop adaptation pathways for a climate robust and CO2-neutral landscape. We demonstrate this process with the case study of the Dutch Overijsselse Vecht.',
    image: 'https://climatescenarios.org/share/og-dutch.jpg'
  }),
  loading: { color: '#fff' },
  css: [
    '@/assets/style/base.scss'
  ],
  router: {
    base: '/investment/'
  },
  resolve: {
    alias: {
      style: 'assets/style'
    }
  },
  build: {
    extend (config, ctx) {
    }
  },
  generate: {
    crawler: false
  }
}
