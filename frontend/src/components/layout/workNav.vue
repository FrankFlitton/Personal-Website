<template>
  <div class="work-nav position-absolute">
    <b-container
     fluid
     class="work-slider"
     :class="{ 'is-compact' : this.isCompact, 'is-full' : !this.isCompact }"
     >
      <!-- swiper -->
      <swiper
       :options="swiperOption"
       ref="workSwiper"
       v-on:reachBeginning="sliderStart()"
       v-on:reachEnd="sliderEnd()"
      >
        <swiper-slide
         v-for="(poster, index) in posters"
         :key="index"
        >

          <work-poster
           :poster="poster"
           :posterState="isCompact"
           :counter="[poster.order + 1, posters.length]"
           v-on:state="updateState"
          ></work-poster>

        </swiper-slide>
        <div class="swiper-pagination d-none" slot="pagination"></div>
      </swiper>
    </b-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  import workPoster from '@/components/layout/workPoster'

  export default {
    components: {
      workPoster
    },
    props: {
      compact: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      // whenever question changes, this function will run
      compact: function (newVal) {
        this.isCompact = newVal
      }
    },
    computed: {
      isMobile () {
        return this.getWindowWidth() < 768
      }
    },
    methods: {
      getWindowWidth (event) {
        this.windowWidth = document.documentElement.clientWidth
        return this.windowWidth
      },
      getWindowHeight (event) {
        this.windowHeight = document.documentElement.clientHeight
        return this.windowHeight
      },
      getSliderSize () {
        if (this.compact) {
          this.swiperOption.height = this.windowHeight * 0.89
        } else {
          this.swiperOption.height = this.windowHeight * 1
        }
        this.swiperOption = JSON.parse(JSON.stringify(this.swiperOption))
      },
      updateState (payload) {
        this.isCompact = payload
      },
      sliderEnd () {
        if (!this.isMobile) {
          this.toSlide(1)
        }
      },
      sliderStart () {
        if (!this.isMobile) {
          this.toSlide(
            this.posters.length - 2
          )
        }
      },
      toSlide (i) {
        this.$nextTick(() => {
          this.$refs.workSwiper.swiper.slideTo(i, 0)
        })
      },
      preparePosters (posters) {
        // The slider misbehaves when loop = true.
        // Create a false first and last slide to
        // work around it for now.

        const firstPage = posters[0]
        const lastPage = posters[posters.length - 1]
        posters.push(firstPage)
        posters.unshift(lastPage)

        return posters
      }
    },
    mounted () {
      this.$nextTick(function () {
        window.addEventListener('resize', this.getWindowWidth)
        window.addEventListener('resize', this.getWindowHeight)

        // Init
        this.getWindowWidth()
        this.getWindowHeight()
        this.getSliderSize()
      })
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.getWindowWidth)
      window.removeEventListener('resize', this.getWindowHeight)
    },
    created () {
      axios.get(`http://craft.frankflitton.com/json`)
      .then(response => {
        // parse obj to array
        let posters = []
        _.forEach(response.data.pages, (page) => {
          posters.push(page)
        })

        if (!this.isMobile) {
          // Format to loop
          this.posters = this.preparePosters(posters)

          // Navigate to first slide
          this.$nextTick(() => {
            this.toSlide(1)
          })
        } else {
          this.posters = posters
        }
      })
      .catch(e => {
        console.log(e)
      })
    },
    data () {
      return {
        windowHeight: 0,
        windowWidth: 0,
        sliderSize: 500,
        sliderIndex: 0,
        sliderAnimating: 0,
        isCompact: this.compact,
        initialSlide: 2,
        posters: [],
        swiperOption: {
          direction: 'vertical',
          autoHeight: true,
          effect: 'fade',
          slidesPerView: 1,
          slidesPerGroup: 1,
          autoplay: {
            delay: 8000,
            disableOnInteraction: false
          },
          lazy: {
            loadPrevNext: this.getWindowWidth() > 450
          },
          keyboard: {
            enabled: true
          },
          mousewheel: true
        }
      }
    }
  }
</script>

<style lang="scss">

@import 'src/assets/styles/variables.scss';

.work-nav {
  width: 100%;
  transform: translate3d(0, 0%, 0);
  .work-slider {
    padding: 0;
  }
  .is-compact {
    height: $slider-compact;
    background: black;
    .swiper-slide, .swiper-wrapper {
      height: $slider-compact !important;
      .color-strip {
        height: $slider-compact;
      }
    }
  }
  .is-full {
    height: $slider-full;
    background:#efefef;
    .swiper-slide, .swiper-wrapper {
      height: $slider-full !important;
      .color-strip {
        height: $slider-full;
      }
    }
  }
}
</style>