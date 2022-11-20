<template>
  <div class="d-flex vw-100 vh-100 contactForm white">
    <v-container fluid class="h-100">
      <v-row class="h-100 fill-height">
        <v-col class="left-col black white--text py-15" cols="12" md="6">
          <v-row>
            <v-col cols="4" md="3" offset="0" offset-sm="1">
              <v-img
                class="w-100 rounded-circle mb-5"
                :src="$github.user.avatarUrl"
              ></v-img>
            </v-col>
            <v-col cols="8" md="5" offset="0" offset-sm="1">
              <h2 class="text-h3 mb-5">Let's Talk</h2>
              <p class="d-none d-sm-block">
                Frank is a Fullstack UX Engineer @ Google with a decade of experience in
                software engineering, UX research, and product design.
              </p>
              <p class="d-none d-sm-block">
                Available for freelance and other opportunities.
              </p>
              <socialLinks class="mt-10" />
            </v-col>
          </v-row>
        </v-col>
        <v-col class="white py-15 right-col">
          <v-row>
            <v-col cols="12" md="10" offset="0" offset-sm="1">
              <contactForm class="h-100" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import contactForm from './contactForm'
import socialLinks from './socialLinks'

export default {
  components: {
    contactForm,
    socialLinks,
  },
}
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';

.contactForm {
  position: fixed;
  top: $header-height;
  overflow-y: scroll;
  height: 100%;
  z-index: 99;
  .left-col {
    position: relative;
    &:after {
      $size: 30px;
      content: ' ';
      position: absolute;
      top: 3rem;
      right: ($size * 0.5 * -1);
      width: $size;
      height: $size;
      background: black;
      transform: rotate(45deg);

      @media (max-width: 767px) {
        top: unset;
        right: unset;
        bottom: ($size * 0.5 * -1);
        left: 3rem;
      }
    }
  }
  .right-col {
    @media (max-width: 767px) {
      min-height: 100vh;
    }
  }
}
</style>