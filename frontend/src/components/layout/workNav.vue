<template>
  <div class="work-nav">
    <b-container>
      <b-button :pressed.sync="isCompact" variant="primary">Toggle Me</b-button> <br />
      {{ this.windowWidth }} x {{ this.windowHeight }} : {{ this.swiperOption.height }}, {{this.isCompact}}
    </b-container>
    <b-container 
     fluid
     class="work-slider"
     :class="{ 'is-compact' : this.isCompact, 'is-full' : !this.isCompact }"
     >
      <!-- swiper -->
      <swiper :options.lazy="swiperOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </b-container>
  </div>
</template>

<script>
  export default {
    props: {
      compact: {
        type: Boolean,
        default: true
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
.work-nav {
  .work-slider {
    height: 100vh;
  }
  .is-compact {
    height: 50vh;
    background: red;
    .swiper-slide {
      height: 50vh !important;
    }
  }
  .is-full {
    height: 60vh;
    background: blue;
    .swiper-slide {
      height: 60vh !important;
    }
  }
  .swiper-slide {
    background: #f0f8ff9c;
  }
  margin-top: 80px;
}
</style>