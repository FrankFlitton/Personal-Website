// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App'
import router from './router'
import Meta from 'vue-meta'
import VueImg from 'v-img'
import gallery from 'img-vuer'
import VeeValidate from 'Vee-Validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faBehance, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([
  faCoffee,
  faTimes,
  faLinkedin,
  faBehance,
  faGithub
])
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(gallery, {
  swipeThreshold: 150  // default 100 ,new in 0.12.0
})

Vue.use(Meta)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper,
  {
    // Config
  }
)

Vue.use(VueImg)

Vue.use(VeeValidate)

Vue.config.silent = true

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'swiper/dist/css/swiper.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
