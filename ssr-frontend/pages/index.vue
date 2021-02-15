<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ page.title }}</h1>
        <nuxt-content :document="page" />
      </v-col>
    </v-row>
    <githubSection />
  </v-container>
</template>

<script>
import githubSection from '~/components/githubSection.vue'

export default {
  components: {
    githubSection
  },
  async asyncData ({ $content }) {
    const page = await $content('hello').fetch()

    return {
      page
    }
  }
}
</script>
