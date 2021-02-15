<template>
  <div class="index-page">
    <featureSlider class="mb-15" />
    <v-container>
      <!-- <v-row>
        <v-col>
          <h1>{{ page.title }}</h1>
          <nuxt-content :document="page" />
        </v-col>
      </v-row> -->
      <mediumSection />
      <githubSection />
    </v-container>
  </div>
</template>

<script>
import featureSlider from '~/components/featureSlider.vue'
import githubSection from '~/components/githubSection.vue'
import mediumSection from '~/components/mediumSection.vue'

export default {
  components: {
    featureSlider,
    githubSection,
    mediumSection
  },
  async asyncData ({ $content }) {
    const page = await $content('hello').fetch()

    return {
      page
    }
  }
}
</script>
