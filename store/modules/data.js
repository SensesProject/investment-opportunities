import { assign, get, filter } from 'lodash'
import axios from 'axios'

const state = () => {
  return {
    investments: []
  }
}

const mutations = {
  DATA_CHANGE (state, data) {
    const obj = {
      status: 'idle',
      data: false,
      message: false
    }
    state.investments = assign(obj, data)
  }
}

const getters = {
  data: (state, getters, rootState) => {
    const model = get(rootState, ['settings', 'model'])
    const region = get(rootState, ['settings', 'region'])
    // const scenario = get(rootState, ['settings', 'scenario'])

    return filter(get(state, ['investments', 'data'], []), { model, region })
  }
}

const actions = {
  loadInvestments ({ commit, state }) {
    const status = get(state.datum, 'status')
    if (status !== 'loading') {
      commit('DATA_CHANGE', { status: 'loading' })
      const url = './data/investments.json'
      axios.get(url)
        .then((response) => {
          commit('DATA_CHANGE', { status: 'success', data: response.data.runs })
        })
        .catch((error) => {
          console.error('error', error)
          commit('DATA_CHANGE', { status: 'error', message: error })
        })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
