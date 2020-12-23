const { getHead } = require('library/src/assets/js/head.js')

export default {
  ssr: false,
  head: getHead({
    title: 'Investment Opportunities and Alignment',
    description: 'What are near-time investment requirements for meeting stringent climate targets in a low carbon world?',
    image: 'https://climatescenarios.org/share/og-investment.jpg'
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
