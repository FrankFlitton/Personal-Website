<template>
  <div class="d-flex vw-100 vh-100 contactForm">
    <v-container fluid class="h-100 red">
      <v-row class="h-100 fill-height">
        <v-col class="black white--text py-15 left-col"
          cols="12"
          md="6"
        >
          <v-row>
            <v-col cols="4" md="3" offset="0" offset-sm="1">
              <v-img
                class="w-100 rounded-circle mb-5"
                :src="$github.user.avatarUrl"
              ></v-img>
            </v-col>
            <v-col cols="8" md="5" offset="0" offset-sm="1">
              <h2 class="text-h3 mb-5">Let's Talk</h2>
              <p class="d-none d-sm-block">Frank is a Fullstack UX Engineer with 8 years of experience in software engineering, UX research, and product design.</p>
              <p class="d-none d-sm-block">Available for freelance and other opportunities.</p>
              <div class="social-links mt-10">
                <v-btn
                  v-for="social in socials"
                  :key="social.url"
                  :href="social.url"
                  target="_blank"
                  fab
                  small
                  color="white"
                  class="mr-5"
                >
                  <v-icon>mdi-{{ social.icon }}</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="white py-15">
          <v-row>
            <v-col cols="12" md="10" offset="0" offset-sm="1">
              <contactForm />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import contactForm from './contactForm'

export default {
  components: {
    contactForm
  },
  computed: {
    socials() {
      let guthubUrl = this.$github.user.url
      return [
        {
          icon: 'github',
          url: guthubUrl,
        },
        {
          icon: 'linkedin',
          url: 'https://www.linkedin.com/in/frankflitton/',
        },
        {
          icon: 'twitter',
          url: 'http://twitter.com/frankflitton',
        },
        {
          icon: 'palette',
          url: 'http://behance.net/frankflitton',
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "assets/styles/variables.scss";

.contactForm {
  position: fixed;
  top: $header-height;
  z-index: 99;
  .left-col {
    position: relative;
    &:after {
      $size: 30px;
      content: " ";
      position: absolute;
      top: 3rem;
      right: ($size * .5 * -1);
      width: $size;
      height: $size;
      background: black;
      transform: rotate(45deg);

      @media(max-width:767px) {
        top: unset;
        right: unset;
        bottom: ($size * .5 * -1);
        left: 3rem;
      }
    }
  }
}
</style>