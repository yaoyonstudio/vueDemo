<template>
  <header>
    <h2 class="textOverflowHide">{{ title }}</h2>
  </header>
</template>

<script>
export default {
  name: 'Topbar',
  props: ['title']
}
</script>

<style scoped lang="scss">
@import '../../css/vars.scss';
header {
  width: 100%; height: 4rem; line-height: 4rem; background-color: $mainColor;
  h2 {
    text-align: center; color: $lightColor; font-weight: center; width: 80%; margin: 0 auto; font-weight: normal; font-size: 1.8rem;
  }
}
</style>
