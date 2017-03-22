<template>
  <div class="menuContainer">
    <ul class="flexRowBetween">
      <router-link class="flexItem" :class="{'router-link-active': $route.path === '/' && item.link === '/index' }" tag="li" :to="item.link" v-for="item in menus">{{ item.title }}</router-link >
    </ul>
  </div>
</template>

<script>
export default {
  name: 'vMenu',
  data () {
    return {
      menus: [
        {id: 1, title: '首页', link: '/index'},
        {id: 2, title: '商城', link: '/shop'},
        {id: 3, title: '我的', link: '/myCenter'},
        {id: 4, title: '测试', link: '/hello'}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.menuContainer{
  @import '../../css/vars.scss';
  width: 100%; height: 4rem; line-height: 4rem; background-color: #dedede;
  ul {
    li { text-align: center; font-size: 1.4rem; }
    li:not(:last-child) {border-right: 1px solid #cccccc; }
    .router-link-active { background-color: $mainColor; color: $lightColor; }
  }
}
</style>
