<template>
  <div class="page flexColumnBetween">
    <topbar :title="title"></topbar>
    <article-filter></article-filter>
    <div class="mainContent" v-infinite-scroll="hasMore">
      <ul>
        <li v-for="article in articles">
          <router-link :to="{ path: '/articles/' + article.id }">
            <article-item :data="article"></article-item>
          </router-link>
        </li>
      </ul>
      <p class="status" v-show="!hasMore">没有更多文章数据</p>
      <p class="status" v-show="!loaded">正在拼命加载中...</p>
      <!-- <button class="loadMoreBtn" @click="loadMore">点击加载更多</button> -->
    </div>
    <!-- <v-menu></v-menu> -->
  </div>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
import { mapState } from 'vuex'
import Topbar from '../public/Topbar'
import VMenu from '../public/VMenu'
import ArticleFilter from './ArticleFilter'
import ArticleItem from './ArticleItem'
// import rdSwipe from '../../libs/vue-slide'
const Events = new Vue({})
Vue.directive('infinite-scroll', {
  inserted: (el, binding, vnode) => {
  },
  componentUpdated: (el, binding, vnode) => {
    if (binding.value) {
      vnode.elm.addEventListener('scroll', function (e) {
        if ((vnode.elm.scrollTop + vnode.elm.clientHeight > vnode.elm.scrollHeight - 10)) {
          Events.$emit('loadMore')
        }
      })
    } else {
      console.log('已没有更多数据，不监听滚动事件')
    }
  }
})

export default {
  name: 'articles',
  data () {
    return {
      title: '文章中心',
      msg: 'Hello Vue.js!',
      slides: [],
      swipe: {
        activeIndex: 0
      },
      imgs: [
        'http://covteam.u.qiniudn.com/test18.jpg',
        'http://covteam.u.qiniudn.com/test19.jpg',
        'http://covteam.u.qiniudn.com/test20.jpg',
        'http://covteam.u.qiniudn.com/test21.jpg'
      ],
      filterString: null
    }
  },
  computed: {
    // 主模块共享的state
    ...mapState([
      'loading'
    ]),
    ...mapState({
      // 分模块后使用mapState绑定相关模块的state
      articles: state => state.indexModule.articles,
      hasMore: state => state.indexModule.hasMore,
      loaded: state => state.indexModule.loaded
    })
  },
  mounted () {
    let that = this
    // 页面进入初始化加载文章
    this.$store.dispatch('getArticlesAction')
    console.log(this.$store.state.indexModule.articles)
    // 监听滚动加载更多事件
    Events.$on('loadMore', function () {
      if (that.$store.state.indexModule.hasMore && that.$store.state.indexModule.loaded) {
        console.log('load more')
        that.$store.commit('ADDPAGE')
        // that.$store.dispatch('getArticlesAction')
        that.$store.dispatch('getFilterArticlesAction', {conditionString: that.filterString})
      }
    })
    // 排序
    this.$on('ORDER', (type) => {
      that.$store.getters.orderArticles(type)
    })
    // 筛选
    this.$on('FILTER', (filterString) => {
      console.log(filterString)
      console.log('筛选条件是否相同：', that.filterString === filterString)
      if (that.filterString && that.filterString === filterString) {
      } else {
        that.filterString = filterString || null
        that.$store.commit('INIT')
      }
      that.$store.dispatch('getFilterArticlesAction', {conditionString: filterString})
    })
  },
  methods: {
    loadMore () {
      let that = this
      console.log(that.filterString)
      if (this.$store.state.indexModule.hasMore && this.$store.state.indexModule.loaded) {
        this.$store.commit('ADDPAGE')
        // this.$store.dispatch('getFilterArticlesAction')
        that.$store.dispatch('getFilterArticlesAction', {conditionString: that.filterString})
      }
    }
  },
  components: {
    // rdSwipe,
    Topbar,
    VMenu,
    ArticleFilter,
    ArticleItem
  }
}
</script>

<style scoped lang="scss">
  @import '../../css/vars.scss';
  .status{text-align: center; height: 3rem; line-height: 3rem; color: $mainFontColor; }
  .loadMoreBtn{width: 100%; border: none; height: 3rem; line-height: 3rem; background-color: #eee;}
</style>
