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
      },
      swiper: function (newVal) {
        console.log('waaatch')
      }
    },
    computed: {
      getSwiperInfo (val) {
        console.log(val)
      }
    },
    methods: {
      getWindowWidth (event) {
        this.windowWidth = document.documentElement.clientWidth
      },
      getWindowHeight (event) {
        this.windowHeight = document.documentElement.clientHeight
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
      axios.get(`http://frankflitton.com/json`)
      .then(response => {
        console.log(response.data.pages)
        // JSON responses are automatically parsed.
        this.posters = response.data.pages
      })
      .catch(e => {
        this.errors.push(e)
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
        posters: {},
        swiperOption: {
          direction: 'vertical',
          autoHeight: true,
          effect: 'fade',
          loop: true,
          slidesPerView: 1,
          autoplay: {
            delay: 8000,
            disableOnInteraction: false
          },
          lazy: {
            loadPrevNext: true
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

@import 'src/styles/variables.scss';

.work-nav {
  width: 100%;
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
    background: blue;
    .swiper-slide, .swiper-wrapper {
      height: $slider-full !important;
      .color-strip {
        height: $slider-full;
      }
    }
  }
}
</style>