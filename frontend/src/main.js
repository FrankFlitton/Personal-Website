// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'swiper/dist/css/swiper.css'
import Meta from 'vue-meta'
import VueImg from 'v-img'
import gallery from '../../../img-vuer'

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

Vue.config.silent = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
