<template>
    <b-nav fill pills class="fixed-top top-nav navbar-light">
        <router-link class="logo nav-item" to="/">
          <div class="brand">
            <img src="http://frankflitton.com/img/logo.png" alt="Frank JE Flitton">
          </div>
          <div class="wordmark">
            <h1>Frank JE Flitton</h1>
          </div>
        </router-link>

        <b-nav-item
          class="text-right nav-toggle"
          v-on:click="navItem"
          title="toggle nav"
        >
          <transition name="fade">
            <font-awesome-icon v-if="!navOpen" icon="coffee" class="text-dark" />
            <font-awesome-icon v-if="navOpen" icon="times" class="text-dark" />
          </transition>
        </b-nav-item>

        <li
          class="coveralls overflow-scroll"
          :class="{'active': navOpen}"
        >
        <div
          class="navClose"
          v-on:click="navItem"
        ></div>
        <contactPage class="navContact"></contactPage>
        </li>
    </b-nav>
</template>

<script>
import contactPage from '@/components/pages/Contact.vue'

export default {
  name: 'topHeader',
  components: {
    contactPage
  },
  methods: {
    navItem () {
      this.navOpen = !this.navOpen
      if (this.navOpen) {
        this.$router.push({hash: '#contact'})
      } else {
        this.$router.push({hash: ''})
      }
    }
  },
  data () {
    return {
      navOpen: false
    }
  }
}
</script>


<style lang="scss">

@import 'src/styles/variables.scss';

.top-nav {
  width: 100%;
  background: white;
  height: $header-top;
  .nav-item a {
    margin-top: 21px;
    margin-bottom: 21px;
  }
  .logo {
    width: 30%;
    min-width: 320px;
    margin-right: 20%;
    overflow: show;
    div {
      background: black;
      width: 41px;
      height: 41px;
      top: 21px;
      left: 21px;
      position: absolute;
      overflow: hidden;
    }
    img {
      display: block;
      width: 100%;
      position: absolute;
    }
    .wordmark {
      left: 80px;
      width: auto;
      background: none;
      top: 27px;
      h1 {
        font-weight: 900;
        text-transform: uppercase;
        color: black;
        font-size: 25px;
      }
    }
  }
  .nav-toggle {
    position: absolute;
    padding-right: 21px;
    right: 0;
    width: 60px;
    display: block;
    flex: unset;
  }
  .coveralls {
    position: absolute;
    display: block;
    height: 0vh;
    width: 100vw;
    opacity: 0;
    transition: all 1s;
    z-index: -1;
    top: 0;
    overflow-y: scroll;
    .navClose {
      height: $header-top;
    }
    .navContact {
      position: relative;
    }
    &.active {
      opacity: 1;
      z-index: 4;
      height: 100vh;
    }
    .h-100 {
      height: 100vh;
    }
    .toggle-button {
      width: 144px;
      color: black;
    }
  }
}
</style>
