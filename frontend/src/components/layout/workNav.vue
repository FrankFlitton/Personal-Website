<template>
  <div class="work-nav"
    
  >
    <b-container 
     fluid
     class="work-slider"
     :class="{ 'is-compact' : this.isCompact, 'is-full' : !this.isCompact }"
     >
     
      <!-- swiper -->
      <swiper :options.lazy="swiperOption">
        <swiper-slide
         v-for="(poster, index) in posters"
         :key="index"
        >

          <work-poster 
           :poster="poster"
           :posterState="isCompact"
           :counter="[index + 1, posters.length]"
           v-on:state="updateState"
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
    data () {
      return {
        windowHeight: 0,
        windowWidth: 0,
        sliderSize: 500,
        isCompact: this.compact,
        posters: [
          {
            title: 'Post Title',
            tag: 'Post Tag',
            image: 'http://frankflitton.com/img/_homePage/db1b7e16220067.562a7198d4f8f.jpg',
            color: '#ff0000'
          },
          {
            title: 'Post Title',
            tag: 'Post Tag',
            image: 'http://frankflitton.com/img/aeris-0.jpg',
            color: '#0000ff'
          }
        ],
        swiperOption: {
          direction: 'vertical',
          autoHeight: true,
          effect: 'fade',
          loop: true,
          slidesPerView: 1,
          autoplay: {
            delay: 10000
          },
          lazy: {
            loadPrevNext: true,
          }
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
  * {
    transition: all 1s ease;
  }
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