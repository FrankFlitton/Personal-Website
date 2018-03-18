<template>
  <div 
   class="work-poster position-relative"
   :style="{ 'background-image': 'url(' + posterLocal.featuredImage + ')' }"
  >
    <b-container fluid>
      <b-row>
        <b-col 
         cols="12"
         sm="12"
         md="4"
        >
          <b-row 
            class="justify-content-center align-items-center color-strip position-relative"
          > 
          <div 
           class="color-bg position-absolute" 
           :style="{ 'background-color': posterLocal.color }"
          >
          </div>
            <b-col cols="9" class="text-container">
              <h2 class="title" v-html="posterLocal.title"></h2>
              <h3 class="description" v-html="posterLocal.description"></h3>
              <div class="circle">
                <svg viewBox="0 0 89 89" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="44.5" cy="44.5" r="43.5"/>
                </svg>
                <span class="number">
                  {{posterLocal.order}}
                </span>
                <hr />
                <span class="number">
                  {{posterLocal.total}}
                </span>
              </div>
              <br/>
              <br/>
              <b-button 
                class="toggle-button"
                v-on:click="btnClick" 
                :variant="'link'"
                size="lg"
              >
                Toggle Me
              </b-button>
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
        // make slider shorter
        this.posterButton = !this.posterButton
        this.$emit('state', this.posterButton)

        // transition page
        this.$router.push('/pages/' + this.posterLocal.slug)
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

$borderColor: rgba(0,0,0,150);

.work-poster {
  background-color: rgba(0, 0, 0, 0.2);
  background-size: cover;
  height: 100%;
  background-position: 50% -100%;
  color: white;
  transition: none;
  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6)
  }
  .number {
    font-weight: 600;
  }
  .title {
    margin-bottom: 1em;
    font-size: 2.5em;
    font-weight: 600;
  }
  .description {
    font-size: 2em;
    margin-bottom: 2em;
    line-height: 1.5em;
  }
  .toggle-button {
    color: white;
    &:after {
      background: white;
    }
    &:hover {
      color: white;
    }
  }
}
.color-bg {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
}

.text-container {
  transform: translateY(-100vh);
  opacity: 0;
}

.circle {
  border-radius: 50%;
  border: 2px solid white;
  width: 89px;
  height: 89px;
  margin: 0 auto;
  padding: 13px;
  position: relative;
  svg, circle {
    position: absolute;
    stroke-width: 2.5px;
    stroke: black;
    fill: transparent;
    width: 89px;
    top: -2px;
    left: -2px;
    transition: all 8.25s linear !important;
    stroke-dasharray: 275;
    stroke-dashoffset: 0;
  }
  svg {
    transform: rotate(270deg);
  }
  hr {
    margin: 5px auto;
    border-top: 2px solid $borderColor;
    width: 2em;
  }
}

.swiper-slide-active {
  transition: none;
  .work-poster {
    background-position: 50% 50%;
  }
  .text-container {
    transform: translateY(0vh);
    opacity: 1;
  }
  .circle {
    svg, circle {
      stroke-dashoffset: 275;
    }
  }
}

@keyframes dash {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 275;
  }
}

</style>