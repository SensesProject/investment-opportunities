import { assign, get, map, groupBy, fromPairs, compact } from 'lodash'
import axios from 'axios'

const PATH_DATA = './data/investments.json'

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
    return get(state, ['investments', 'data'], [])
  }
}

const actions = {
  loadInvestments ({ commit, state }) {
    const status = get(state.datum, 'status')
    if (status !== 'loading') {
      commit('DATA_CHANGE', { status: 'loading' })
      axios.get(PATH_DATA)
        .then((response) => {
          commit('DATA_CHANGE', { status: 'success', data: response.data })
        })
        .catch((error) => {
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
