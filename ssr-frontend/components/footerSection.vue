<template>
  <v-footer dark class="py-10">
    <v-row align="center">
      <v-col md="4" lg="4" sm="12" cols="12">
        <h2 class="pb-5 text-md-left text-center">Let's Connect</h2>
        <social-links class="text-md-left text-center" />
      </v-col>
      <v-col class="text-md-right text-center">
        <p class="pt-10">&copy; {{ getYear() }} Frank Flitton.</p>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import socialLinks from './socialLinks'

export default {
  components: {
    socialLinks,
  },
  methods: {
    getYear() {
      const now = new Date(Date.now())
      return now.getFullYear()
    },
  },
}
</script>