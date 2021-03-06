import { has, get, set, isUndefined, isNaN } from 'lodash'
import { GROUP_FOSSILS, GROUP_NON_FOSSILS, GROUP_OTHERS, DEFAULT_MODEL, DEFAULT_REGION } from '~/store/config'

const DEFAULTS = {
  model: DEFAULT_MODEL,
  region: DEFAULT_REGION,
  barStacked: false,
  barDifference: false,
  showRegions: false,
  isRotated: false,
  highlight: [],
  isColored: false,
  step: 0
}

const state = () => {
  return {
    model: DEFAULT_MODEL,
    region: DEFAULT_REGION,
    barStacked: DEFAULTS.barStacked,
    barDifference: DEFAULTS.barDifference,
    showRegions: DEFAULTS.showRegions,
    isRotated: DEFAULTS.isRotated,
    highlight: DEFAULTS.highlight,
    isColored: DEFAULTS.isColored,
    step: DEFAULTS.step
  }
}

const mutations = {
  SETTINGS_CHANGE (state, { key, value }) {
    if (has(state, key)) {
      let val = value
      if (isUndefined(value) || isNaN(value)) {
        val = get(DEFAULTS, key)
      }
      set(state, key, val)

      if (key === 'showRegions' && val === true) {
        set(state, 'barStacked', true)
      }

      if (key === 'barStacked' && val === false) {
        set(state, 'showRegions', false)
      }
    }
  }
}

const actions = {
  changeSettings ({ commit }, params) {
    commit('SETTINGS_CHANGE', params)
  },
  changeStep ({ commit }, step) {
    commit('SETTINGS_CHANGE', { key: 'step', value: step })
    switch (step) {
      case 0:
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: false })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: false })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: [] })
        commit('SETTINGS_CHANGE', { key: 'region', value: DEFAULT_REGION })
        commit('SETTINGS_CHANGE', { key: 'model', value: DEFAULT_MODEL })
        break
      case 1:
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: [] })
        commit('SETTINGS_CHANGE', { key: 'region', value: DEFAULT_REGION })
        commit('SETTINGS_CHANGE', { key: 'model', value: DEFAULT_MODEL })
        break
      case 2:
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: GROUP_FOSSILS })
        commit('SETTINGS_CHANGE', { key: 'region', value: DEFAULT_REGION })
        commit('SETTINGS_CHANGE', { key: 'model', value: DEFAULT_MODEL })
        break
      case 3:
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: GROUP_NON_FOSSILS })
        commit('SETTINGS_CHANGE', { key: 'region', value: DEFAULT_REGION })
        commit('SETTINGS_CHANGE', { key: 'model', value: DEFAULT_MODEL })
        break
      case 4:
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: GROUP_OTHERS })
        commit('SETTINGS_CHANGE', { key: 'region', value: DEFAULT_REGION })
        commit('SETTINGS_CHANGE', { key: 'model', value: DEFAULT_MODEL })
        break
      case 5:
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: true })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: [] })
        commit('SETTINGS_CHANGE', { key: 'region', value: DEFAULT_REGION })
        commit('SETTINGS_CHANGE', { key: 'model', value: DEFAULT_MODEL })
        break
      case 6:
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: true })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: [] })
        commit('SETTINGS_CHANGE', { key: 'region', value: DEFAULT_REGION })
        commit('SETTINGS_CHANGE', { key: 'model', value: DEFAULT_MODEL })
        break
      case 7:
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: true })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: [] })
        commit('SETTINGS_CHANGE', { key: 'region', value: DEFAULT_REGION })
        commit('SETTINGS_CHANGE', { key: 'model', value: DEFAULT_MODEL })
        break
    }
  }
}

export default {
  state,
  mutations,
  actions
}
