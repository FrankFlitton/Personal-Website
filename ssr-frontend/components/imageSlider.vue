<template>
  <div class="white image-slider-container" id="image-slider-container" v-show="isVisible">
    <div class="image-meta">
      <v-container fluid>
        <v-row>
          <v-col class="align-start">
            <v-sheet
              color="black"
              class="h-100 counter text-center pt-1"
              width="56"
              height="56"
            >
              <span class="white--text">
                {{ currentIndex + 1 }}
              </span>
              <hr class="white mx-auto" style="height: 1px;">
              <span class="white--text">
                {{ imageData.length }}
              </span>
            </v-sheet>
          </v-col>
          </v-col>
          <v-col class="my-auto text-center" cols="6">
            <p class="pa-0 ma-0">
              {{ desc }}
            </p>
          </v-col>
          <v-col>
            <v-btn
              class="d-flex ml-auto white"
              fab
              elevation="0"
              @click="toggleVisible"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="image-slider">
          <transition name="fade">
              <!-- v-if="isVisible" -->
            <v-carousel
              v-model="currentIndex"
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              light
            >
              <v-carousel-item
                v-for="image in imageData"
                :key="'image-' + image.id"
                class="vw-100"
              >
                <v-img
                  :src="image.src"
                  :alt="image.alt"
                  :contain="true"
                  class="pa-15 mx-auto p-relative"
                />
              </v-carousel-item>
            </v-carousel>
          </transition>

    </transition>


    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageData: [],
      currentIndex: 0,
      isVisible: false,
      desc: '',
      pageFreezePosition: 0,
    }
  },
  methods: {
    setCurrentIndex(index) {
      console.log('index', index)
      this.isVisible = true
      this.currentIndex = index
    },
    toggleVisible() {
      this.isVisible = !this.isVisible
    },
    freezeScrolling() {
      console.log('freeze')
      if (process.client) {
        const slider = document.getElementById('image-slider-container')
        const scrollY = document.documentElement.style.getPropertyValue(
          '--scroll-y'
        )
        const body = document.body
        this.pageFreezePosition = scrollY
        body.style.position = 'fixed'
        body.style.top = `-${this.pageFreezePosition}`
        body.style.width = '100%'
        slider.style.position = 'fixed'
        slider.style.top = '0px'
      }
    },
    releaseScrolling() {
      console.log('release')
      if (process.client) {
        const slider = document.getElementById('image-slider-container')
        const body = document.body
        body.style.position = ''
        body.style.top = ''
        body.style.width = ''
        slider.style.position = ''
        slider.style.top = ''
        window.scrollTo(0, parseInt(this.pageFreezePosition || '0'))
      }
    },
    createImageNodes() {
      // Process DOM content from CMS after draw
      let vm = this
      if (process.client) {
        // Wait draw cycle
        vm.$nextTick(() => {
          // Examine generated img nodes
          const nuxtContent = document.getElementsByClassName('nuxt-content')
          const imageNodes = nuxtContent[0].querySelectorAll('img')

          this.imageData = [...imageNodes]
            .filter((n) => !!n.src && !!n.alt) // Validate
            .map((node, index) => {
              // Create event handeler for navigation
              let clickFn = () => {
                vm.setCurrentIndex(index)
              }
              node.onclick = clickFn
              node.onmousedown = clickFn
              node.onpointerdown = clickFn
              node.onauxclick = clickFn

              // Pack Info
              const src = node.src
              const alt = node.alt
              const id = [...node.attributes][2].name + index
              return {
                src,
                alt,
                id,
              }
            })
        })
      }
    },
  },
  watch: {
    currentIndex: function (newVal) {
      if (this.imageData[newVal] !== undefined) {
        this.desc = this.imageData[newVal].alt
      }
    },
    isVisible: function (newVal) {
      let vm = this
      console.log(newVal)
      if (newVal) {
        // Show modal, Lock scrolling
        vm.freezeScrolling()
      } else {
        vm.releaseScrolling()
      }
    },
  },
  created() {
    let vm = this
    if (process.client) {
      // Cache scroll position
      window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty(
          '--scroll-y',
          `${window.scrollY}px`
        )
      })
      vm.createImageNodes()
    }
  },
  beforeDestroy() {
    if (process.client) {
      // Remove cache scroll position
      window.removeEventListener('scroll', () => {}, true)
    }
  },
}
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';

.image-slider-container {
  position: absolute;
  top: -$header-height;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  .image-meta {
    height: $header-height;
  }
  .image-slider {
    .v-carousel {
      height: $full-page !important;
      .v-window__prev,
      .v-window__next {
        .v-btn {
          color: white;
        }
      }
    }
    .v-image {
      width: 100% !important;
      height: 100% !important;
      margin: 0 auto;
      .v-image__image {
        max-width: calc(100vw - 90px) !important;
        max-height: calc(#{$full-page} - 50px) !important;
        left: 45px;
        margin: auto;
      }
    }
  }
}
</style>