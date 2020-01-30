import Vue from 'vue'
import Vuex from 'vuex'
import VTooltip from 'v-tooltip'
import data from './modules/data'
import settings from './modules/settings'
import options from './modules/options'

Vue.use(Vuex)
Vue.use(VTooltip)

export const modules = {
  data,
  settings,
  options
}
