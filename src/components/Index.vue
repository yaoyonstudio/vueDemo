<template>
  <div class="page flexColumnBetween">
    <topbar :title="title"></topbar>
    <div class="mainContent" v-infinite-scroll="hasMore">
      <rd-swipe :swipe="swipe">
        <div 
          class="rd-swipe-item" 
          :style="{ 'background-image': `url(${img})` }" 
          v-for="(img, index) in imgs">
        </div>
      </rd-swipe>
      <ul>
        <li v-for="article in articles">
          <article-item :data="article"></article-item>
        </li>
      </ul>
      <p class="status" v-show="!hasMore">没有更多文章数据</p>
      <p class="status" v-show="!loaded">正在拼命加载中...</p>
      <!-- <button class="loadMoreBtn" @click="loadMore">点击加载更多</button> -->
    </div>
    <v-menu></v-menu>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { mapState } from 'vuex'
import Topbar from './public/Topbar'
import VMenu from './public/VMenu'
import ArticleItem from './IndexComponents/ArticleItem'
import rdSwipe from '../libs/vue-slide'
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
  name: 'index',
  data () {
    return {
      title: 'Vue DemoVue DemoVue DemoVue DemoVue DemoVue DemoVue DemoVue Demo',
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
      ]
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
    // 页面进入请求滑动图片
    axios.get('http://localhost:3000/sliders').then((res) => {
      console.log(res)
      if (res.status === 200 && res.data && res.data.length) {
        res.data.map((item) => {
          that.slides.push(item)
        })
      }
    }, (error) => {
      console.log(error)
    })
    // 页面进入初始化加载文章
    this.$store.dispatch('getArticlesAction')
    console.log(this.$store.state.indexModule.articles)
    // 监听滚动加载更多事件
    Events.$on('loadMore', function () {
      if (that.$store.state.indexModule.hasMore && that.$store.state.indexModule.loaded) {
        console.log('load more')
        that.$store.commit('ADDPAGE')
        that.$store.dispatch('getArticlesAction')
      }
    })
  },
  methods: {
    loadMore () {
      if (this.$store.state.indexModule.hasMore && this.$store.state.indexModule.loaded) {
        this.$store.commit('ADDPAGE')
        this.$store.dispatch('getArticlesAction')
      }
    }
  },
  components: {
    rdSwipe,
    Topbar,
    VMenu,
    ArticleItem
  }
}
</script>

<style scoped lang="scss">
  @import '../css/vars.scss';
  .status{text-align: center; height: 3rem; line-height: 3rem; color: $mainFontColor; }
  .loadMoreBtn{width: 100%; border: none; height: 3rem; line-height: 3rem; background-color: #eee;}
</style>
