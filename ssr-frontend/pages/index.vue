<template>
  <v-row>
    <v-col>
      <h1>{{ page.title }}</h1>
      <nuxt-content :document="page" />

      {{ $github }}
    </v-col>
  </v-row>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    // Logo,
    // VuetifyLogo
  },
  async asyncData ({ $content }) {
    const page = await $content('hello').fetch()

    return {
      page
    }
  }
}
</script>
