<template>
  <div class="work-poster" :style="{ 'background-image': 'url(' + image + ')' }">
    <b-container>
      <b-row>
        <b-col sm="4">
          <b-row>
            <b-col class="vertical-center">
              <h2>
                {{headline}}
              </h2>
              <h3>
                {{tagline}}
              </h3>
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
      image: {
        type: String
      },
      headline: {
        type: String
      },
      tagline: {
        type: String
      }
    },
    data () {
      return {
        windowHeight: 0,
        windowWidth: 0,
        sliderSize: 500,
        isCompact: this.compact
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
  background-position: center center;
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
</style>