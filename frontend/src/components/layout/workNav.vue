<template>
  <div class="work-nav"
    v-on:click="isCompact = !isCompact"
  >
    <b-container 
     fluid
     class="work-slider"
     :class="{ 'is-compact' : this.isCompact, 'is-full' : !this.isCompact }"
     >
     
      <!-- swiper -->
      <swiper :options.lazy="swiperOption">
        <swiper-slide
         v-for="(n, index) in 10"
         :key="index"
        >

          <work-poster 
           :image="'http://frankflitton.com/img/_homePage/db1b7e16220067.562a7198d4f8f.jpg'"
           :headline="index + 1 + ' headline'"
           tagline="asdasd"
          ></work-poster>

        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </b-container>
  </div>
</template>

<script>
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
    data () {
      return {
        windowHeight: 0,
        windowWidth: 0,
        sliderSize: 500,
        isCompact: this.compact,
        swiperOption: {
          direction: 'vertical',
          autoHeight: true,
          loop: true,
          slidesPerView: 1,
          keyboard: {
            enabled: true
          },
          mousewheel: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }
  }
</script>

<style lang="scss">

@import 'src/styles/variables.scss';

.work-nav {
  margin-top: $header-top;
  .work-slider {
    padding: 0;
  }
  .is-compact {
    height: $slider-compact;
    background: red;
    .swiper-slide {
      height: $slider-compact !important;
    }
  }
  .is-full {
    height: $slider-full;
    background: blue;
    .swiper-slide {
      height: $slider-full !important;
    }
  }
  .swiper-slide {
    background: #f0f8ff9c;
  }
}
</style>