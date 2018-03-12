<template>
  <div id="app">
    <top-header></top-header>
    <work-nav></work-nav>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import topHeader from '@/components/layout/topHeader'
import workNav from '@/components/layout/workNav'

export default {
  name: 'app',
  components: {
    topHeader, workNav
  }
}
</script>

<style lang="scss">

@import 'src/styles/index.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
