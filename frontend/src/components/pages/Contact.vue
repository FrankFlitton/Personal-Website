<template>
  <div class="contact text-left">
    <b-container fluid>
      <b-row>
        <b-col
          md="6"
          id="row1"
          class="bg-primary text-white full-screen mobile-small"
        >
          <b-container>
            <b-row>
              <b-col
                md="10"
                offset-md="1"
                class="pt-5 pb-5 h-100"
              >
                <h1 class="mb-5">
                  Let's talk.
                </h1>
                <p class="icons">
                  <a href="https://www.github.com/frankflitton" target="_blank">
                    <font-awesome-icon :icon="['fab', 'github']" />
                  </a>&ensp;
                  <a href="https://www.behance.net/frankflitton" target="_blank">
                    <font-awesome-icon :icon="['fab', 'behance']" />
                  </a>&ensp;
                  <a href="https://www.linkedin.com/in/frankflitton/" target="_blank">
                    <font-awesome-icon :icon="['fab', 'linkedin']" />
                  </a>&ensp;
                </p>
              </b-col>
            </b-row>
          </b-container>
        </b-col>

        <b-col
          md="6"
          id="row2"
          class="bg-light text-primary full-screen"
        >
          <b-container>
            <b-row>
              <b-col
                md="8"
                offset-md="2"
                class="pt-5 pb-5">
                <contact-form></contact-form>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import contactForm from '@/components/forms/contactForm.vue'

export default {
  name: 'contact',
  components: {
    contactForm
  },
  metaInfo: {
    title: 'Contact'
  }
}

</script>

<style lang="scss">
@import 'src/styles/variables.scss';

.contact {
  font-size: 21px;
    a {
      color: rgba(226, 226, 226, 0.7);
    }
    img {
      display: block;
      width: 100%;
      margin-bottom: 3em;
      max-width: 400px;
    }
    .full-screen {
      min-height: 100vh;
      height: auto;
      overflow: hidden;
      &.mobile-small {
        @media(max-width:767px){
          min-height: 13em;
          height: 13em;
        }
      }
      @media(min-width:768px){
        min-height: $slider-full
      }
      &:after {
        content: ' ';
        display: block;
        position: absolute;
        width: 34px;
        height: 34px;
        top: calc(0vh - 17px);
        left: 10vw;
        background: #007bff;
        transform: rotate(45deg);
        @media(min-width:768px){
          top: 2.5em;
          left: calc(0vw - 17px);
        }
      }
      .icons {
        position: absolute;
        top: 100%;
      }
    }
}
</style>

