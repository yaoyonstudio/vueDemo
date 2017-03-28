import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Api from './apis'

import { GETARTICLES, ADDPAGE, GETARTICLE, SETARTICLEID, RANDOMARTICLES, CHANGE_RANDOM_NUMS, CLEAR_ARTICLES } from './mutations'

const indexModule = {
  state: {
    page: 1,
    pagesize: 7,
    hasMore: true,
    loaded: false,
    articles: [],
    articleId: null,
    article: {},
    randomNums: 5,
    randomArticles: []
  },
  mutations: {
    [CLEAR_ARTICLES] (state) {
      state.articles = []
    },
    [GETARTICLES] (state, articles) {
      if (articles && articles.length) {
        articles.map((item) => {
          state.articles.push(item)
        })
        state.loaded = true
      } else {
        state.articles = []
      }
    },
    [ADDPAGE] (state) {
      state.page++
    },
    [SETARTICLEID] (state, id) {
      state.articleId = id
    },
    [GETARTICLE] (state, article) {
      state.article = article
    },
    [RANDOMARTICLES] (state, articles) {
      state.randomArticles = []
      if (articles && articles.length) {
        articles.map((item) => {
          state.randomArticles.push(item)
        })
      }
    },
    [CHANGE_RANDOM_NUMS] (state, nums) {
      if (nums && nums > 0) {
        state.randomNums = nums
      }
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
    },
    getArticleAction ({state, commit}) {
      Api.getArticle(state.articleId).then((res) => {
        if (res.status === 200 && res.data) {
          commit('GETARTICLE', res.data)
        } else {
          commit('GETARTICLE', {})
        }
      }, (error) => {
        console.log(error)
        commit('GETARTICLE', {})
      })
    },
    getRandomArticlesAction ({state, commit}) {
      Api.getRandomArticles(state.randomNums).then((res) => {
        if (res.status === 200 && res.data) {
          commit('RANDOMARTICLES', res.data)
        } else {
          commit('RANDOMARTICLES', [])
        }
      }, (error) => {
        console.log(error)
        commit('RANDOMARTICLES', [])
      })
    },
    getFilterArticlesAction ({commit}, {conditionString}) {
      Api.getFilterArticles(conditionString).then((res) => {
        console.log(res)
        if (res.status === 200 && res.data) {
          commit('CLEAR_ARTICLES')
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
