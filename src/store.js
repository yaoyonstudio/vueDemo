import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { GETARTICLES } from './mutations'
import Api from './apis'

const indexModule = {
  state: {
    articles: []
  },
  mutations: {
    [GETARTICLES] (state, articles) {
      state.articles = articles
    }
  },
  actions: {
    getArticlesAction ({commit}) {
      Api.getPosts().then((res) => {
        if (res.status === 200 && res.data.length) {
          commit('GETARTICLES', res.data)
        } else {
          commit('GETARTICLES', [])
        }
      }, (error) => {
        console.log(error)
        commit('GETARTICLES', [])
      })
    }
  }
}

export default new Vuex.Store({
  state: {
    loading: false
  },
  modules: {
    indexModule: indexModule
  }
})
