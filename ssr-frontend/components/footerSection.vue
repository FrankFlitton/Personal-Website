<template>
  <v-footer dark class="py-10">
    <v-container>
      <v-row align="center">
        <v-col md="3" offset-md="0" sm="6" offset-sm="3" cols="8" offset="2">
          <h2 class="pb-5 text-md-left text-center">Let's Connect</h2>
          <social-links class="text-md-left text-center" />
          <p class="pt-8 text-md-left text-center">&copy; {{ getYear() }} Frank Flitton</p>
        </v-col>
      </v-row>
    </v-container>
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