<template>
  <div id="app">
    <fje-header></fje-header>
    <work-nav></work-nav>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import fjeHeader from '@/components/layout/header'
import workNav from '@/components/layout/workNav'

export default {
  name: 'app',
  components: {
    fjeHeader, workNav
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  transition: all 0.5s ease;
}
</style>
