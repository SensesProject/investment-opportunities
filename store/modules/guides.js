const state = () => {
  return {
    guides: []
  }
}

const mutations = {
  CHANGE_GUIDES (state, guides) {
    state.guides = guides
  }
}

const actions = {
  changeGuides ({ commit }, guides) {
    commit('CHANGE_GUIDES', guides)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
