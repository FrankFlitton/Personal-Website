<template>
  <div class="index-page">
    <featureSlider class="mb-15" :projects="projects" />
    <v-container class="mb-15">
      <v-row>
        <v-col>
          <h1>{{ page.title }}</h1>
          <nuxt-content :document="page" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import featureSlider from '~/components/featureSlider.vue'

export default {
  components: {
    featureSlider,
  },
  async asyncData({ $content }) {
    const page = await $content('hello').fetch()
    const projects = await $content('projects')
      .without(['body'])
      .sortBy('path')
      .fetch()

    return {
      page,
      projects,
    }
  },
  head() {
    return {
      title: 'Developing Great Products',
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.page.featuredImage
        }
      ]
    }
  },
}
</script>
