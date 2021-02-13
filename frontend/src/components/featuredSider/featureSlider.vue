<template>
  <div class="home-slider home-slider-height w-100">
    <!-- Slider main container -->
    <div class="swiper-container home-slider-height" id="home-page-swiper">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="(project, index) in projects"
          :key="`${index}project.id`"
          class="swiper-slide home-slider-height bg-cover w-100 slider-content"
          :style="{
            'background-image': `url(${project.featuredImage})`,
          }"
        >
          <a class="text-content" :href="`/pages/${project.slug}`">
            <b-container fluid class="home-slider-height">
              <b-row class="home-slider-height">
                <b-col cols="12" md="5" lg="4" class="text-light pl-0 pr-0">
                  <div
                    class="d-flex align-items-center w-100 h-100 p-2"
                    :style="{
                      'background-color': `${project.color}`,
                    }"
                  >
                    <div class="project-meta w-100">
                      <h1 class="mb-4">{{project.title}}</h1>

                      <p
                        class="description mb-5 px-5"
                        v-if="project.projectTagline"
                        v-html="project.projectTagline"
                      ></p>
                      <p class="description mb-5 px-5" v-else v-html="project.description"></p>

                      <progress-circle
                        :realIndex="realIndex"
                        :markerIndex="index"
                        :totalLength="projects.length"
                        class="mb-3"
                      ></progress-circle>
                      <b-btn>Learn More</b-btn>
                    </div>
                  </div>

                  <div
                    class="h-100 w-100 position-absolute"
                    :style="{
                      'background-color': `${project.color}`,
                    }"
                  ></div>
                </b-col>
              </b-row>
            </b-container>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.home-slider {
  background: black;
  color: white;
  height: $slider-full;
  width: calc(100vw - 40px) !important;
  margin-left: 20px;
}
.slider-content {
  transition: all 1s ease;
  &:before {
    content: " ";
    position: absolute;
    background: black;
    opacity: 0.3;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .text-content {
    opacity: 0;
    transition: all 1s ease !important;
    display: block;
    text-decoration: none;
    h1 {
      font-weight: bold;
    }
    .description {
      font-size: 1.25em;
    }
    .project-meta {
      position: relative;
      top: 200px;
    }
    &:hover {
      text-decoration: none;
      .btn::after {
        width: 100%;
        left: 0;
      }
    }
    .btn {
      background: transparent;
      outline: none;
      border: none;
      color: white;

      &::after {
        background: white;
      }
    }
  }
}
.swiper-slide-active {
  .text-content {
    opacity: 1;
    .project-meta {
      top: 0;
    }
  }
}
</style>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import progressCircle from './progressCircle.vue'

export default {
  name: 'featureSlider',
  components: {
    progressCircle
  },
  data () {
    return {
      projects: [],
      swiper: {},
      realIndex: 0
    }
  },
  created () {
    fetch(`http://craft.frankflitton.com/json`)
      .then(res => {
        return res.json()
      })
      .then(responseData => {
        // parse obj to array
        let projects = []
        for (const key in responseData.pages) {
          responseData.pages[key].color = responseData.pages[key].color
            .replace('rgb', 'rgba')
            .replace(')', ', 0.8)')

          projects.push(responseData.pages[key])
        }
        this.projects = projects.filter((project) => { return project.project === '1' })
      })
      .then(() => {
        this.createSlider()
      })
      .catch(e => {
        throw e.message
      })
  },
  mounted () {
    let vm = this
    document.addEventListener('keypress', vm.handleKeyPress)
    document.onkeydown = vm.handleKeyPress
  },
  beforeDestroy () {
    let vm = this
    document.removeEventListener('keypress', vm.handleKeyPress, true)
  },
  methods: {
    createSlider () {
      let vm = this
      vm.swiper = new Swiper('#home-page-swiper', {
        // direction: 'vertical',
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        loop: true,
        slidesPerGroup: 1,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false
        },
        init: false
      })

      // Load last viewed project or first project
      vm.swiper.on('init', () => vm.toLastViewedProject())
      vm.swiper.init()
      // Update viewed project index
      vm.swiper.on('slideChange', () =>
        vm.setLastViewedProject(vm.swiper.realIndex)
      )
    },
    handleKeyPress (e) {
      let vm = this
      switch (e.keyCode) {
        case 37:
          vm.toPrevProject()
          break
        case 38:
          vm.toPrevProject()
          break
        case 39:
          vm.toNextProject()
          break
        case 40:
          vm.toNextProject()
          break
      }
    },
    toNextProject () {
      const next = (this.realIndex + 2) % this.projects.length
      this.toSlide(next)
    },
    toPrevProject () {
      let prev = this.realIndex % this.projects.length
      if (prev <= 0) {
        prev = this.projects.length - this.realIndex
      }
      this.toSlide(prev)
    },
    toLastViewedProject () {
      const homeSwiperIndex = Number(sessionStorage.getItem('homeSwiperIndex'))
      typeof homeSwiperIndex === 'number'
        ? this.toSlide(homeSwiperIndex + 1)
        : this.toSlide(0)
    },
    setLastViewedProject (index) {
      this.realIndex = index
      sessionStorage.setItem('homeSwiperIndex', index)
    },
    toSlide (i) {
      this.$nextTick(() => {
        this.swiper.slideTo(i, 0, () => {})
      })
    },
    toFirstSlide () {
      this.$nextTick(() => {
        this.swiper.slideTo(1, 0, () => {})
      })
    },
    toLastSlide () {
      const lastSlideIndex = this.pages.length - 1
      this.$nextTick(() => {
        this.swiper.slideTo(lastSlideIndex, 0)
      })
    }
  }
}
</script>
