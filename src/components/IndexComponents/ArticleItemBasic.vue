<template>
  <div class="flexRowBetween item">
    <h3>{{ data.title }}</h3>
    <span class="date">{{ data.publish }}</span>
  </div>
</template>

<script>
export default {
  name: 'ArticleItemBasic',
  props: ['data'],
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import '../../css/vars.scss';
.item {
  width: 100%; height: 3rem; overflow: hidden;
  position: relative;
  h3 { font-weight: normal; font-size: 1.5rem; flex: 1; width: 100%; height: 3rem; overflow: hidden; word-break:keep-all; white-space:nowrap; text-overflow: ellipsis;}
  span.date{display: block; width: 7rem; text-align: right;}
}
</style>
