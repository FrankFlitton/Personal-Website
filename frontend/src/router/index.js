import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
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
      path: '/pages/:id',
      name: 'Portfolio',
      component: Portfolio
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      const position = {}

      return new Promise(resolve => {
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          position.x = 0
          position.y = 0
        }

        // wait for the out transition to complete (if necessary)
        this.app.$root.$once('triggerScroll', () => {
          // if the resolved position is falsy or an empty object,
          // will retain current scroll position.
          resolve(position)
        })
      })
    }
  }
})
