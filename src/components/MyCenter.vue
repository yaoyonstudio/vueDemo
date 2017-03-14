<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'myCenter',
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
  @import '../css/vars.scss';
</style>
