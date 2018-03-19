<template>
  <div class="home">
    <work-nav></work-nav>
  </div>
</template>

<script>
import workNav from '@/components/layout/workNav'

export default {
  name: 'hello',
  components: {
    workNav
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Portfolio',
    // all titles will be injected into this template
    titleTemplate: '%s | Frank JE Flitton',
    meta: {
      name: 'description', content: 'Frank JE  Flitton is a Full Stack Designer specializing in UI / UX. Frank is based in Kitchener/Waterloo, Ontario, Canada.'
    }
  }
}
</script>
