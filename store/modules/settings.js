import { has, get, set, isUndefined, isNaN } from 'lodash'
import { GROUP_FOSSILS, GROUP_NON_FOSSILS, GROUP_OTHERS } from '~/store/config'

const DEFAULTS = {
  model: 'average',
  region: 'World',
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
    model: DEFAULTS.model,
    region: DEFAULTS.region,
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
    // console.log({ key, value })
    if (has(state, key)) {
      let val = value
      if (isUndefined(value) || isNaN(value)) {
        val = get(DEFAULTS, key)
      }
      set(state, key, val)
    }
  }
}

const actions = {
  changeSettings ({ commit }, params) {
    commit('SETTINGS_CHANGE', params)
  },
  changeStep ({ commit }, step) {
    // commit('SETTINGS_CHANGE', params)
    commit('SETTINGS_CHANGE', { key: 'step', value: step })
    switch (step) {
      case 0:
        // this.changeSettings({ key: 'isRotated', value: false })
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: false })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: false })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: [] })
        break
      case 1:
        // commit('SETTINGS_CHANGE', { key: 'isRotated', value: false })
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: [] })
        break
      case 2:
        // commit('SETTINGS_CHANGE', { key: 'isRotated', value: true })
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: GROUP_FOSSILS })
        break
      case 3:
        // commit('SETTINGS_CHANGE', { key: 'isRotated', value: true })
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: GROUP_NON_FOSSILS })
        break
      case 4:
        // commit('SETTINGS_CHANGE', { key: 'isRotated', value: true })
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: false })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: GROUP_OTHERS })
        break
      case 5:
        // commit('SETTINGS_CHANGE', { key: 'isRotated', value: true })
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: true })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: [] })
        break
      case 6:
        // commit('SETTINGS_CHANGE', { key: 'isRotated', value: true })
        commit('SETTINGS_CHANGE', { key: 'barStacked', value: true })
        commit('SETTINGS_CHANGE', { key: 'showRegions', value: true })
        commit('SETTINGS_CHANGE', { key: 'isColored', value: true })
        commit('SETTINGS_CHANGE', { key: 'highlight', value: [] })
        break
    }
  }
}

export default {
  state,
  mutations,
  actions
}
