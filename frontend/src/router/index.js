import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Contact from '@/components/pages/Contact'
import Portfolio from '@/components/pages/Portfolio'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/pages/:id',
      name: 'Portfolio',
      component: Portfolio
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else if (to.hash) { // if has a hash...
      return { selector: to.hash } // scroll to the element
    } else {
      return {x: 0, y: 0}
    }
  }
})
