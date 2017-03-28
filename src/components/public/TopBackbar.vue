<template>
  <header>
    <h2 class="textOverflowHide">{{ title }}</h2>
    <span @click="goBack"></span>
  </header>
</template>

<script>
export default {
  name: 'TopBackbar',
  props: ['title'],
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../css/vars.scss';
header {
  width: 100%; height: 4rem; line-height: 4rem; background-color: $mainColor; position: relative;
  h2 {
    text-align: center; color: $lightColor; font-weight: center; width: 80%; margin: 0 auto; font-weight: normal; font-size: 1.8rem;
  }
  span{
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 2rem;
    height:2rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left cetnter;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAArCAYAAACTkhN2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAj0lEQVRIx+3VsQ3CMBBG4Z+MwGYMQTpSsQKdSZNUoU5FSYlEwzJs8SiSwnJ9J9nSXefmfbJl6STjAXrgA5ytwxeycQsDL6/wO8IR5tpcuHyKb3Ph+n9FhBsODy4bZI/n8zMLS+okpex8BEZLQMC9uMESQAD1A2sAJTAXwMMaSAEEYA5MrsDBtL4BN0knSc8/KRgEWHMneQwAAAAASUVORK5CYII=);
  }
}
</style>
