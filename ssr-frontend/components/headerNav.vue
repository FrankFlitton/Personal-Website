<template>
  <v-container fluid class="bg-white">
    <v-row>
      <v-col class="brand-logo align-start">
        <v-img class="d-block" src="/img/branding/logo.svg"></v-img>
      </v-col>
      <v-col class="align-self-center pa-0">
        <h1 class="d-flex">Frank JE Flitton</h1>
      </v-col>
      <v-spacer />
      <v-col>
          <v-btn
            class="d-flex ml-auto"
            fab
            elevation="0"
          >
            <v-icon>mdi-coffee</v-icon>
          </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
  @import "assets/styles/variables.scss";

  .brand-logo {
    max-width: $header-height;
  }
</style>