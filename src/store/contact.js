export const state = () => ({
  isVisible: false
})

export const mutations = {
  toggle(state) {
    state.isVisible = !state.isVisible

    const body = window.document.body
    if(state.isVisible) {
      body.style.position = 'fixed'
      body.style.overflow = 'hidden'
    } else {
      body.style.position = 'relative'
      body.style.overflow = 'scroll'
    }
  }
}
