<template>
  <v-app :dark="false" class="p-rele">
    <headerNav class="p-fixed top" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import headerNav from '~/components/headerNav.vue'
export default {
  components: {
    headerNav
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  @import "assets/styles/index.scss";
</style>
