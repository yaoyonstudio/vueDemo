import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import makePy from './libs/makePy'

import Api from './apis'

import { INIT, GETARTICLES, ADDPAGE, GETARTICLE, SETARTICLEID, RANDOMARTICLES, CHANGE_RANDOM_NUMS, CLEAR_ARTICLES } from './mutations'

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
  getters: {
    orderArticles: (state, getters) => (type) => {
      if (!type) return
      switch (type) {
        case 1:
          // 按标题升序
          state.articles.sort((item1, item2) => {
            item1.title = item1.title.trim()
            item2.title = item2.title.trim()
            var item1FirstCharacterPy = makePy(item1.title.substr(0, 1))
            var item2FirstCharacterPy = makePy(item2.title.substr(0, 1))
            return item1FirstCharacterPy[0].charCodeAt(0) - item2FirstCharacterPy[0].charCodeAt(0)
          })
          break
        case 2:
          // 按标题降序
          state.articles.sort((item1, item2) => {
            item1.title = item1.title.trim()
            item2.title = item2.title.trim()
            var item1FirstCharacterPy = makePy(item1.title.substr(0, 1))
            var item2FirstCharacterPy = makePy(item2.title.substr(0, 1))
            return item2FirstCharacterPy[0].charCodeAt(0) - item1FirstCharacterPy[0].charCodeAt(0)
          })
          break
        case 3:
          // 按时间升序
          state.articles.sort((item1, item2) => {
            return new Date(item1.publish).getTime() - new Date(item2.publish).getTime()
          })
          break
        case 4:
          // 按时间降序
          state.articles.sort((item1, item2) => {
            return new Date(item2.publish).getTime() - new Date(item1.publish).getTime()
          })
          break
        case 5:
          // 按来源排序
          state.articles.sort((item1, item2) => {
            item1.source = item1.source.trim()
            item2.source = item2.source.trim()
            var item1FirstCharacterPy = makePy(item1.source.substr(0, 1))
            var item2FirstCharacterPy = makePy(item2.source.substr(0, 1))
            return item1FirstCharacterPy[0].charCodeAt(0) - item2FirstCharacterPy[0].charCodeAt(0)
          })
          break
        case 6:
          // 自然排序
          state.articles.sort((item1, item2) => {
            return item1.id - item2.id
          })
          break
      }
    }
  },
  mutations: {
    [INIT] (state) {
      state.page = 1
      state.pagesize = 7
      state.hasMore = true
      state.loaded = false
      state.articles = []
    },
    [CLEAR_ARTICLES] (state) {
      state.articles = []
    },
    [GETARTICLES] (state, articles) {
      if (articles && articles.length) {
        if (articles.length < state.pagesize) {
          state.hasMore = false
        }
        articles.map((item) => {
          state.articles.push(item)
        })
        state.loaded = true
      } else {
        state.hasMore = false
        state.loaded = true
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
    // 获取文章列表（没有筛选,弃用）
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
    // 获取文章内容
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
    // 获取随机文章列表
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
    // 获取文章列表
    getFilterArticlesAction ({state, commit}, {conditionString}) {
      state.loaded = false
      let _conditionString = conditionString || null
      Api.getFilterArticles(state.page, state.pagesize, _conditionString).then((res) => {
        console.log(res)
        if (res.status === 200 && res.data) {
          commit('GETARTICLES', res.data)
        } else {
          commit('GETARTICLES', [])
          state.loaded = true
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
