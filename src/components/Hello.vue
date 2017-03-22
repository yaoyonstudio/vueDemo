<template>
  <div class="hello"
    <h1>{{ msg }} - {{busy}}</h1>
  </div>
</template>

<script>
// import Vue from 'vue'
// import infiniteScroll from 'vue-infinite-scroll'
// Vue.use(infiniteScroll)

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Hello Vue.js!',
      busy: false
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
$color: #dd3333;
h1 {
  font-weight: normal;
  color: $color;
}
</style>
