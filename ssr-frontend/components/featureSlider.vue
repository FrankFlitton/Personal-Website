<template>
  <v-container fluid class="feature-slider">
    <v-row>
      <v-col class="py-0 p-relative">
        <v-carousel
          :continuous="true"
          :cycle="true"
          :interval="6000"
          :show-arrows="false"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="80vh"
          v-model="realIndex"
        >
          <v-carousel-item
            v-if="!!projects.length"
            v-for="(project, index) in projects"
            :key="projects.slug"
          >
            <v-sheet color="black" height="100%" tile>
              <v-img
                :src="project.featuredImage"
                height="100%"
                tile
                class="d-flex"
              >
                <v-row class="fill-height">
                  <v-col
                    cols="12"
                    md="5"
                    class="fill-height py-0 mt-3 poster-container"
                  >
                    <v-sheet
                      class="color-block"
                      :color="project.color"
                      height="100%"
                      tile
                    />
                    <nuxt-link
                      :to="'/projects/' + project.slug"
                      class="poster align-center row fill-height text-decoration-none white--text"
                    >
                      <div class="project-info mx-auto text-center">
                        <h2 class="text-h4 font-weight-bold mb-4">
                          {{ project.title }}
                        </h2>
                        <p class="text-h6 mb-15">
                          {{ project.description }}
                        </p>
                        <div class="mb-5">
                          <transition name="fade">
                            <progress-circle
                              v-if="realIndex === index"
                              :realIndex="realIndex + 1"
                              :markerIndex="index + 1"
                              :totalLength="projects.length"
                            />
                          </transition>
                        </div>
                        <v-btn
                          :to="'/projects/' + project.slug"
                          color="white"
                          elevation="0"
                          class="text-h6 text-capitalize py-6"
                          text
                        >
                          Learn More
                        </v-btn>
                      </div>
                    </nuxt-link>
                  </v-col>
                </v-row>
              </v-img>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <transition name="fade">
          <preloader class="preloader p-absolute p-top" v-if="!loaded" />
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import progressCircle from '~/components/progressCircle.vue'
import preloader from '~/components/preloader.vue'

export default {
  components: {
    progressCircle,
    preloader,
  },
  props: {
    projects: {
      required: true,
      type: Array,
    },
  },
  created() {
    let vm = this
    if (process.client) {
      // Prevent rendering issues.
      document.fonts.ready.then(function () {
        vm.loaded = document.fonts.check('1em futura-pt') // true
      })
    }
  },
  data() {
    return {
      realIndex: -1,
      loaded: false,
    }
  },
}
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';

.feature-slider {
  .v-window,
  .v-window__container,
  .v-image,
  .preloader {
    height: $slider-full !important;
  }
  .poster-container {
    position: relative;
    .color-block {
      opacity: 0.9;
    }
    .poster {
      position: absolute;
      top: 12px;
      left: 24px;
      right: 24px;
      .v-btn:after {
        content: ' ';
        position: absolute;
        background: white;
        width: 100%;
        height: 1px;
        bottom: 0;
      }
    }
  }
}
</style>