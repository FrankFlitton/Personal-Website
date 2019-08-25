<template>
  <div
   class="work-poster position-relative"
   :style="{ 'background-image': 'url(' + poster.featuredImage + ')' }"
  >
    <b-container fluid>
      <b-row>
        <b-col
         cols="12"
         sm="12"
         md="5"
         lg="4"
        >
          <b-row
            class="justify-content-center align-items-center color-strip position-relative"
          >
          <!-- <div
           class="color-bg position-absolute"
           :style="{ 'background-color': poster.color }"
          ></div> -->
            <b-col cols="9" class="text-container">
              <h2 class="title" v-html="poster.title"></h2>

              <h3 class="description" v-if="poster.projectTagline" v-html="poster.projectTagline"></h3>
              <h3 class="description" v-else v-html="poster.description"></h3>
              <div class="circle">
                <svg viewBox="0 0 89 89" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="44.5" cy="44.5" r="43.5"/>
                </svg>
                <span class="number">
                  {{poster.order}}
                </span>
                <hr />
                <span class="number">
                  {{poster.total}}
                </span>
              </div>
              <br/>
              <b-btn
                class="toggle-button"
                :variant="'link'"
                size="lg"
                :href="`/pages/${this.poster.slug}`"
              >
                Learn More
              </b-btn>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    props: {
      poster: {
        type: Object,
        required: true
      },
      posterState: {
        type: Boolean
      },
      counter: {
        type: Number
      }
    },
    data () {
      return {
        posterButton: this.posterState
      }
    },
    methods: {
      btnClick: () => {
        // make slider shorter
        this.posterButton = !this.posterButton
        console.log(this.poster)
        this.$emit('state', this.posterButton)

        // transition page
        this.$router.push(`/pages/${this.poster.slug}`)
      }
    }
  }
</script>

<style lang="scss">

@import 'src/assets/styles/variables.scss';

$borderColor: rgba(0,0,0,150);

.work-poster {
  background-color: rgba(0, 0, 0, 0.2);
  background-size: cover;
  height: 100%;
  background-position: 50% -100%;
  color: white;
  transition: none;

  @media(max-width:767px) {
    font-size: 13px;
  }

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
    @media (max-width: 767px) {
      font-size: 15px;
    }
  }
  .title {
    margin-bottom: 1em;
    font-size: 2.21em;
    font-weight: 600;
    @media(max-width:575px){
      font-size: 2em;
    }
  }
  .description {
    font-size: 1.75em;
    margin-bottom: 2em;
    line-height: 1.5em;
    @media(max-width:575px){
      font-size: 1.5em;
    }
  }
  .toggle-button {
    color: white;
    z-index: 999;
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

.circle, .pick {
  border-radius: 50%;
  border: 2px solid white;
  width: 89px;
  height: 89px;
  margin: 0 auto;
  padding: 13px;
  position: relative;
  transform: scale(0.8);
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
  .circle, .pick {
    svg, circle, path {
      stroke-dashoffset: 275;
    }
  }
  .pick {
    svg {
      transform: rotate(360deg) scale(0.89);
    }
    svg, path {
      stroke-dashoffset: -273;
    }
  }
}

</style>