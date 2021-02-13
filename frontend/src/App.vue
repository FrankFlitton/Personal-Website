<template>
  <div id="app" class="bg-white">
    <top-header></top-header>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import topHeader from '@/components/topHeader'

export default {
  name: 'app',
  components: {
    topHeader
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/index.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: $header-top;
}
body,
html {
  background: black;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
