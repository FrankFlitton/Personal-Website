<template>
    <b-nav fill pills class="fixed-top top-nav navbar-light">
        <router-link class="logo nav-item" to="/">
          <div class="brand">
            <img src="http://frankflitton.com/img/logo.png" alt="">
          </div>
          <div class="wordmark">
            <img src="http://frankflitton.com/img/logo.png" alt="">
          </div>
        </router-link>

        <b-nav-item
          class="text-right nav-toggle"
          v-on:click="navItem"
          title="toggle nav"
        >

          <!-- <span class="navbar-toggler-icon"></span> -->
          <i class="material-icons text-dark">menu</i>

        </b-nav-item>

        <li
          class="coveralls"
          :class="{'active': navOpen}"
        >
        <!-- <li
          class="coveralls"
          :class="{'active': navOpen}"
          @click="closeNav"
        > -->
        <div
          class="nacClose"
          v-on:click="navItem"
        ></div>
        <contactPage class="navContact"></contactPage>
          <!-- <b-container class="h-100 justify-content-center align-items-center position-relative">
            <b-row class="justify-content-center align-items-center position-relative h-100">
              <b-col cols="12">
                <b-button
                  class="toggle-button d-block"
                  variant="link"
                  size="lg"
                  to="/"
                >
                  Work
                </b-button>
                <b-button
                  class="toggle-button d-block"
                  variant="link"
                  size="lg"
                  to="/contact"
                >
                  Contact
                </b-button>
              </b-col>
            </b-row>
          </b-container> -->
        </li>
    </b-nav>
</template>

<script>
import contactPage from '@/components/pages/Contact'

export default {
  name: 'topHeader',
  components: {
    contactPage
  },
  methods: {
    closeNav () {
      this.navOpen = false
    },
    navItem () {
      this.navOpen = !this.navOpen
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
      left: 75px;
      width: 180px;
      top: 24px;
      height: 35px;
      img {
        bottom: 0;
        left: 0;
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
    .nacClose {
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
