<template>
  <div class="contact text-left">
    <b-container fluid>
      <b-row>
        <b-col
          md="6"
          id="row1"
          class="bg-primary text-white full-screen"
        >
          <b-container>
            <b-row>
              <b-col
                md="10"
                offset-md="1"
                class="pt-5 pb-5"
              >
                <h1 class="mb-5 pb-3">
                  Let's talk.
                </h1>
                <h3>Frank JE Flitton</h3>
                <h4 class="mb-4">Fullstack Designer</h4>
                <p>
                  Kitchener, Ontario, Canada
                </p>
                <p>
                  1.226.748.9015 <br>
                  frontdesk@frankflitton.com
                </p>
                <p>
                  <a href="https://www.linkedin.com/in/frank-flitton-52691239/" target="_blank">Linkedin</a> <br>
                  <a href="https://www.behance.net/frankflitton" target="_blank">Behance</a>
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




          <!-- <b-row>
              <b-col md="5" offset-md="1">
                <img src="http://frankflitton.com/img/fflitton-head.jpg" alt="">
              </b-col>
              <b-col md="5">
                <h2>Frank J.E. Flitton</h2>
                <h3>Fullstack Designer</h3>
                <p>&nbsp;<br></p>
                <p>
                  Kitchener, Ontario, Canada
                </p>
                <p>
                  1.226.748.9015 <br>
                  frontdesk@frankflitton.com <br>
                </p>
                <p>
                  <a href="https://www.linkedin.com/in/frank-flitton-52691239/" target="_blank">Linkedin</a> <br>
                  <a href="https://www.behance.net/frankflitton" target="_blank">Behance</a>
                </p>
              </b-col>
              <b-col>
              </b-col>
          </b-row> -->
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
      min-height: 80vh;
      overflow: hidden;
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
    }
}
</style>

