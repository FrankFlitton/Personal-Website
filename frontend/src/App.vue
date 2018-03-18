<template>
  <div id="app">
    <top-header></top-header>
    <transition 
      name="fade"
      >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import topHeader from '@/components/layout/topHeader'

export default {
  name: 'app',
  components: {
    topHeader
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
  padding-top: $header-top;
}
* {
  transition: all 0.75s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
