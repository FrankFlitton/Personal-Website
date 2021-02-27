<template>
  <v-row class="social-links">
    <v-col v-for="social in socials" :key="social.url" cols="3">
      <v-btn
        :href="social.url"
        target="_blank"
        fab
        small
        color="white"
        class="mr-5"
      >
        <v-icon color="black"> mdi-{{ social.icon }} </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    socials() {
      let guthubUrl = this.$github.user.url
      let twitterUrl = this.$github.user.twitterUsername
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
          url: `http://twitter.com/${twitterUrl}`,
        },
        {
          icon: 'palette',
          url: 'http://behance.net/frankflitton',
        },
      ]
    },
  },
}
</script>