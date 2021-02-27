<template>
  <div class="d-flex w-100">
    <v-container fluid class="white sticky-header">
      <v-row>
        <nuxt-link to="/" class="ma-0 pa-0 d-flex black--text">
          <v-col class="brand-logo align-start">
            <v-img class="d-block" src="/img/branding/logo.svg"></v-img>
          </v-col>
          <v-col class="align-self-center pa-0 d-none d-sm-flex">
            <h1 class="d-flex">Frank&nbsp;JE&nbsp;Flitton</h1>
          </v-col>
        </nuxt-link>
        <v-spacer />
        <v-col>
          <v-btn class="d-flex ml-auto white" fab elevation="0" @click="toggle">
            <v-icon v-if="!isVisible">mdi-coffee</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div class="sticky-padding">&nbsp;</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    isVisible() {
      return this.$store.state.contact.isVisible
    },
  },
  methods: {
    ...mapMutations({
      toggle: 'contact/toggle',
    }),
  },
}
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';
.sticky-header {
  top: 0;
  position: fixed;
  z-index: 1;
  a {
    color: black;
    text-decoration: none;
  }
}
.brand-logo {
  max-width: $header-height !important;
  height: $header-height !important;
}
.sticky-padding {
  height: $header-height;
}
</style>