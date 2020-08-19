import { has, get, set, isUndefined, isNaN } from 'lodash'

const DEFAULTS = {
  model: 'AIM/CGE',
  region: 'World',
  barStacked: false,
  barDifference: false,
  showModels: false,
  isRotated: false,
  step: 0
}

const state = () => {
  return {
    model: DEFAULTS.model,
    region: DEFAULTS.region,
    barStacked: DEFAULTS.barStacked,
    barDifference: DEFAULTS.barDifference,
    showModels: DEFAULTS.showModels,
    isRotated: DEFAULTS.isRotated,
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
    }
  }
}

const actions = {
  changeSettings ({ commit }, params) {
    commit('SETTINGS_CHANGE', params)
  }
}

export default {
  state,
  mutations,
  actions
}
