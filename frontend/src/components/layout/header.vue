<template>
  <div class="header d-fixed">
    <b-nav fill pills>
        <b-nav-item active class="logo">Home</b-nav-item>
        <b-nav-item >Link</b-nav-item>
        <b-nav-item>Link</b-nav-item>
        <b-nav-item>Another Link</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.header {
  width: 100%;
  background: white;
  border-bottom: 1px black dotted;  
  .nav-item a {
    margin-top: 21px;
    margin-bottom: 21px;
  }
  .logo {
    width: 50%;
  }
}
</style>
