<template>
  <div class="work-poster" 
   :style="{ 'background-image': 'url(' + posterLocal.image + ')' }"
  >
    <b-container fluid>
      <b-row>
        <b-col 
         cols="12"
         sm="12"
         md="4"
        >
          <b-row 
            class="justify-content-center align-items-center color-strip"
            :style="{ 'background-color': posterLocal.color + '' + 89 }"
          >
            <b-col class="text-container">
              <h2>
                {{posterLocal.title}}
              </h2>
              <h3>
                {{posterLocal.tag}}
              </h3>
              {{counter[0]}}
              <hr/>
              {{counter[1]}}
              <br/>
              <br/>
              <b-button v-on:click="btnClick" variant="primary">{{posterButton}} Toggle Me</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    props: ['poster', 'posterState', 'counter'],
    watch: {
      poster: function (btnState) {
        this.posterLocal = Object.assign({}, this.poster)
      }
    },
    methods: {
      btnClick () {
        this.posterButton = !this.posterButton
        this.$emit('state', this.posterButton)
      }
    },
    data () {
      return {
        windowHeight: 0,
        windowWidth: 0,
        sliderSize: 500,
        posterButton: this.posterState,
        posterLocal: Object.assign({}, this.poster)
      }
    }
  }
</script>

<style lang="scss">

@import 'src/styles/variables.scss';

.work-poster {
  background-color: rgba(0, 0, 0, 0.2);
  background-size: cover;
  height: 100%;
  background-position: 50% -100%;
  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6)
  }
  color: white;
}

.text-container {
  transform: translateY(-100vh);
  opacity: 0;
}
.swiper-slide-active {
  .work-poster { 
    background-position: 50% 50%;
  }
  .text-container {
    transform: translateY(0vh);
    opacity: 1;
  }
}
</style>