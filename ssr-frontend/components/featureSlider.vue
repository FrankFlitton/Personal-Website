<template>
  <v-container fluid class="feature-slider">
    <v-row>
      <v-col class="py-0">
        <v-carousel
          :continuous="false"
          :cycle="true"
          :interval="6000"
          :show-arrows="false"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="80vh"
          v-model="realIndex"
        >
          <v-carousel-item
            v-for="i in 5"
            :key="i"
          >
            <v-sheet
              color="black"
              height="100%"
              tile
            >
              <v-img
                src="/img/projects/momentum/momentumFeature.jpg"
                height="100%"
                tile
                class="d-flex"
              >
                <v-row
                  class="fill-height"
                >
                  <v-col cols="12" md="5" class="fill-height py-0 mt-3 poster-container">
                    <v-sheet
                      class="color-block"
                      color="teal accent-4"
                      height="100%"
                      tile
                    />
                    <v-row
                      class="fill-height poster"
                      align="center"
                    >
                      <div class="project-info mx-auto text-center">
                        <h2 class="text-h4 font-weight-bold mb-4">
                          Momentum
                        </h2>
                        <p class="text-h6 mb-15">
                          Never get slowed down by your samples
                        </p>
                        <div class="mb-5">
                          <transition name="fade">
                            <progress-circle
                              v-if="realIndex === i - 1"
                              :realIndex="realIndex + 1"
                              :markerIndex="i"
                              :totalLength="5"
                            />
                          </transition>
                        </div>
                        <v-btn
                          :to="'/project'"
                          color="white"
                          elevation="0"
                          text
                        >
                          <span class="text-h6 text-capitalize">Learn More</span>
                        </v-btn>
                      </div>
                    </v-row>
                  </v-col>
                </v-row>
              </v-img>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import progressCircle from '~/components/progressCircle.vue'

export default {
  components: {
    progressCircle
  },
  data () {
    return {
      realIndex: 0
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import "assets/styles/variables.scss";

  .feature-slider {
    .v-window, .v-window__container, .v-image {
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
      }
    }
  }
</style>