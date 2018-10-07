<template>
  <div class="home">
    <work-nav></work-nav>
  </div>
</template>

<script>
import workNav from '@/components/layout/workNav'

export default {
  name: 'home',
  components: {
    workNav
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Portfolio',
    // all titles will be injected into this template
    titleTemplate: '%s | Frank JE Flitton',
    meta: {
      name: 'description', content: 'Frank is a Full Stack Designer with 8 years of experience in software engineering, UX research, and product design. Available for freelance and other opportunities.'
    }
  }
}
</script>
