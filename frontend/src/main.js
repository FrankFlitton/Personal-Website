import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueImg from 'v-img'
import gallery from 'img-vuer'
import VeeValidate from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faBehance, faGithub, faAppStore } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles/index.scss'

Vue.config.productionTip = false

library.add([
  faCoffee,
  faTimes,
  faLinkedin,
  faBehance,
  faGithub,
  faAppStore
])
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(gallery, {
  swipeThreshold: 150 // default 100 ,new in 0.12.0
})

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VueImg)

Vue.use(VeeValidate)

Vue.config.silent = true

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
