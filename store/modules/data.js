import { assign, get, filter, map, groupBy, fromPairs, compact } from 'lodash'
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
    // Get the currently selected region
    const region = get(rootState, ['settings', 'region'])
    // Based on the region, we filter the data
    console.log('getter data:')
    console.log(get(state, ['investments', 'data'], []))
    console.log('filtered', region, filter(get(state, ['investments', 'data'], []), { region }))
    return filter(get(state, ['investments', 'data'], []), { region })
  },
  dataByScenario: (state, getters) => {
    console.log('Data (dataByScenario):', getters.data)
    return groupBy(getters.data, 'scenario')
  },
  dataByVariable: (state, getters) => {
    console.log('Data (dataByVariable):', getters.data)
    return groupBy(getters.data, 'variable')
  },
  relativeValues: (state, getters, rootState) => {
    const selectedModel = get(rootState, ['settings', 'model'], false)
    return map(getters.data, ({ model, region, variable, value, changes, scenario }) => {
      const [change, isPositive] = get(changes, selectedModel, [0, false])
      return {
        region,
        variable,
        value,
        change,
        isPositive,
        scenario
      }
    })
  },
  relativeValuesByScenario: (state, getters, rootState) => {
    const selectedModel = get(rootState, ['settings', 'model'], false)
    return fromPairs(compact(map(getters.dataByScenario, (scenario, key) => {
      if (key === 'CPol') { return false }
      const rel = map(scenario, ({ model, region, variable, value, changes }) => {
        const [change, isPositive] = get(changes, selectedModel, [0, false])
        return {
          model, // Used?
          region,
          variable,
          value,
          change,
          isPositive
        }
      })
      return [key, rel]
    })))
  },
  relativeValuesByVariable: (state, getters, rootState) => {
    const selectedModel = get(rootState, ['settings', 'model'], false)
    // console.log(getters.dataByVariable)
    return fromPairs(map(getters.dataByVariable, (variable, key) => {
      // console.log({ variable, key })
      const rel = compact(map(variable, ({ region, value, changes, scenario }) => {
        if (scenario === 'CPol') { return false }
        const [change, isPositive] = get(changes, selectedModel, [0, false])
        // console.log({ region, scenario, change })
        return {
          region,
          scenario,
          value, // Used?
          change,
          isPositive,
          variable: key
        }
      }))
      console.log({ key, rel })
      return [key, rel]
    }))
  }
}

const actions = {
  loadInvestments ({ commit, state }) {
    const status = get(state.datum, 'status')
    if (status !== 'loading') {
      commit('DATA_CHANGE', { status: 'loading' })
      axios.get(PATH_DATA)
        .then((response) => {
          console.log({ response })
          commit('DATA_CHANGE', { status: 'success', data: response.data })
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
