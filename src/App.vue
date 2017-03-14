<template>
  <div class="page flexColumnBetween">
    <router-view class="mainContent"></router-view>
    <v-menu></v-menu>
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
