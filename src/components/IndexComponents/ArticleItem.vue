<template>
  <div class="item">
    <img :src="data.images" />
    <h3>{{ data.title }}</h3>
    <p class="source">{{ data.source }}</p>
    <p class="date">{{ data.publish }}</p>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: ['data'],
  data () {
    return {
      msg: 'Hello Vue.js!'
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import '../../css/vars.scss';
.item {
  width: 100%; padding: 1rem; overflow: hidden;
  border-bottom: 1px solid $borderColor;
  img {width: 6rem; float: left; margin-right: 1rem;}
  h3 { font-weight: normal; font-size: 1.5rem; margin-bottom: .5rem; }
  .source{display: inline-block; background-color: $mainColor; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: .8rem;}
  .date{font-size: .8rem; font-style: italic; float: right; display: inline-block; text-align: right;}
}
</style>
