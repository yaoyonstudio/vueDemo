import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Api from './apis'

import { GETARTICLES, ADDPAGE } from './mutations'

const indexModule = {
  state: {
    page: 1,
    pagesize: 7,
    hasMore: true,
    loaded: false,
    articles: []
  },
  mutations: {
    [GETARTICLES] (state, articles) {
      if (articles && articles.length) {
        articles.map((item) => {
          state.articles.push(item)
        })
        state.loaded = true
      }
    },
    [ADDPAGE] (state) {
      state.page++
    }
  },
  actions: {
    getArticlesAction ({state, commit}) {
      state.loaded = false
      Api.getArticles(state.page, state.pagesize).then((res) => {
        if (res.status === 200 && res.data.length) {
          commit('GETARTICLES', res.data)
          if (res.data.length < state.pagesize) {
            state.hasMore = false
          }
        } else {
          commit('GETARTICLES', [])
          state.hasMore = false
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
