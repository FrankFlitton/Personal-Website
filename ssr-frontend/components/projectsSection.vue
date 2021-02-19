<template>
  <div class="projects-section w-100 mb-15">
    <v-row>
      <v-col>
        <v-btn href="/projects/" class="px-0 mx-0" color="white" elevation="0">
          <v-icon class="black--text">mdi-apps</v-icon>&nbsp;
          <h2>Projects</h2>
        </v-btn>
      </v-col>
    </v-row>
    <transition-group name="fade">
      <preloader
        v-if="$fetchState.pending"
        style="height: 400px !important; filter: invert(1) hue-rotate(45deg)"
      />

      <v-row
        v-else
        v-for="project in projects"
        :key="project.slug"
        class="mb-5"
      >
        <v-col cols="12" class="d-flex d-md-none">
          <v-img :src="project.featuredImage" aspect-ratio="1.8" :contain="false"></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12">
              <a :href="`/projects/${project.slug}`" class="black--text">
                <h3 class="text-h4 mb-5">
                  {{ project.title }}
                </h3>
              </a>
            </v-col>
            <v-col sm="8" cols="12" class="line-clamp">
              <span v-html="project.longDescription"></span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" class="d-none d-md-flex">
          <v-img :src="project.featuredImage" aspect-ratio="1.8" :contain="false"></v-img>
        </v-col>
      </v-row>
    </transition-group>
  </div>
</template>

<script>
import preloader from '~/components/preloader.vue'

export default {
  components: {
    preloader,
  },
  data() {
    return {
      projects: [],
    }
  },
  async fetch() {
    this.projects = await this.$content('projects')
      .only(['title', 'longDescription', 'featuredImage', 'slug'])
      .sortBy('path')
      .fetch()
      .catch((error) => console.error(error))
  },
}
</script>

<style lang="scss">
.line-clamp span {
  height: 4.2em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
