<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>{{ loading }}</p>
    {{ articles }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Hello Vue.js!'
    }
  },
  computed: {
    ...mapState([
      'loading'
    ]),
    ...mapState({
      // 分模块后使用mapState绑定相关模块的state
      articles: state => state.indexModule.articles
    })
  },
  mounted () {
    this.$store.dispatch('getArticlesAction')
    console.log(this.$store.state.indexModule.articles)
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  @import '../css/vars.scss';
</style>
