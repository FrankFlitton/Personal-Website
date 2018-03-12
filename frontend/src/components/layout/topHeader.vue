<template>
    <b-nav fill pills class="fixed-top top-nav">
        <b-nav-item active class="logo">Home</b-nav-item>
        <b-nav-item >Link</b-nav-item>
        <b-nav-item>Link</b-nav-item>
        <b-nav-item>Another Link</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
    </b-nav>
</template>

<script>
export default {
  name: 'topHeader',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

@import 'src/styles/variables.scss';

.top-nav {
  width: 100%;
  background: white;
  border-bottom: 1px black dotted;  
  height: $header-top;
  .nav-item a {
    margin-top: 21px;
    margin-bottom: 21px;
  }
  .logo {
    width: 50%;
  }
}
</style>
