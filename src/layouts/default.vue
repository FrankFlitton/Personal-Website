<template>
  <v-app>
    <headerNav />
    <v-main>
      <transition name="fade">
        <nuxt />
      </transition>
    </v-main>
    <transition name="fade">
      <contactPage v-if="isContactVisible" />
    </transition>
    <v-container>
      <projectsSection />
      <githubSection />
      <mediumSection />
    </v-container>
    <footerSection />
  </v-app>
</template>

<script>
import mediumSection from '~/components/mediumSection.vue'
import githubSection from '~/components/githubSection.vue'
import projectsSection from '~/components/projectsSection.vue'
import footerSection from '~/components/footerSection.vue'
import headerNav from '~/components/headerNav.vue'
import contactPage from '~/components/contactPage.vue'

export default {
  components: {
    headerNav,
    contactPage,
    mediumSection,
    githubSection,
    projectsSection,
    footerSection,
  },
  computed: {
    isContactVisible() {
      return this.$store.state.contact.isVisible
    },
  },
}
</script>

<style lang="scss">
@import 'assets/styles/index.scss';
</style>
