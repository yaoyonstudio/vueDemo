<template>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<script>
import vMenu from './components/public/VMenu'
export default {
  name: 'app',
  components: {
    vMenu
  }
}
</script>

<style>
</style>
