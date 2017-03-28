<template>
  <div class="page flexColumnBetween">
    <top-backbar :title="title"></top-backbar>
    <div class="mainContent">
      <h2>{{ article.title }}</h2>
      <p><span>来源：{{ article.source }}</span> <span>{{ article.publish}}</span></p>
      <hr />
      <img :src="article.images" />
      <section class="related">
        <h3>随机文章</h3>
        <ul>
          <li v-for="article in randomArticles">
            <router-link :to="{ path: '/articles/' + article.id }" replace>
              <article-item-basic :data="article" tag="a"></article-item-basic>
            </router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopBackbar from '../public/TopBackbar'
import ArticleItemBasic from './ArticleItemBasic'

export default {
  name: 'articles',
  data () {
    return {
      title: '文章中心',
      msg: 'Hello Vue.js!'
    }
  },
  watch: {
    // 在Vue中，相同的组件只会渲染一次，因此，当在嵌套路由中的ID改变时，当前页面的组件不会重新渲染，也就不会重新载入带有新的ID的路由，因此，需要watch这个路由ID，重新加载新ID下的数据
    '$route.params.id' (newId, oldId) {
      console.log(newId)
      this.$store.commit('SETARTICLEID', newId)
      this.$store.dispatch('getArticleAction')
      this.$store.dispatch('getRandomArticlesAction')
    }
  },
  computed: {
    // 主模块共享的state
    ...mapState([
      'loading'
    ]),
    ...mapState({
      // 分模块后使用mapState绑定相关模块的state
      article: state => state.indexModule.article,
      randomArticles: state => state.indexModule.randomArticles
    })
  },
  mounted () {
    // 页面进入初始化加载文章
    console.log(this.$route.params.id)
    this.$store.commit('SETARTICLEID', this.$route.params.id)
    this.$store.dispatch('getArticleAction')
    this.$store.dispatch('getRandomArticlesAction')
  },
  methods: {
  },
  components: {
    TopBackbar,
    ArticleItemBasic
  }
}
</script>

<style scoped lang="scss">
  @import '../../css/vars.scss';
  .mainContent{
    padding: 1rem;
    p{
      margin: .5rem 0;
      span:not(:last-child) {margin-right: 1rem;}
    }
    hr{margin: 1rem 0;}
    img {margin: 0 auto; width: 100%; text-align: center; display: block; max-height: 200px;}
    .related{
      margin-top: 3rem; border-bottom: 1px solid $borderColor;
      h3{
        width: 100%; border-bottom: 1px solid $borderColor; height: 3rem; line-height: 3rem;
      }
      ul{
        li{height: 3rem; line-height: 3rem;}
        li:not(:last-child) {border-bottom: 1px dashed $borderColor;}
      }
    }
  }
</style>
