<template>
  <div class="medium-section w-100 mb-15">
    <v-row>
      <v-col>
        <v-btn
          :href="author.url || 'http://frankflitton.medium.com/'"
          target="_blank"
          class="px-0 mx-0"
          color="white"
          elevation="0"
        >
          <v-icon class="black--text">mdi-book</v-icon>&nbsp;
          <h2>Blog Posts</h2>
        </v-btn>
      </v-col>
    </v-row>
    <transition-group name="fade">
      <preloader
        v-if="$fetchState.pending"
        style="height: 400px !important; filter: invert(1) hue-rotate(45deg)"
      />

      <v-row v-else v-for="post in posts" :key="post.id" class="mb-5">
        <v-col cols="12" class="d-flex d-md-none">
          <v-img :src="post.featuredImage" aspect-ratio="1.8" :contain="false"></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12">
              <a :href="post.url" class="black--text" target="_blank">
                <h3 class="text-h4 mb-5">
                  {{ post.title }}
                </h3>
              </a>
            </v-col>
            <v-col cols="8">
              <p>
                {{ post.description }}
              </p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" class="d-none d-md-flex">
          <v-img :src="post.featuredImage" aspect-ratio="1.8" :contain="false"></v-img>
        </v-col>
      </v-row>
    </transition-group>
  </div>
</template>

<script>
import axios from 'axios'
import preloader from '~/components/preloader.vue'

export default {
  components: {
    preloader,
  },
  data() {
    return {
      posts: [],
      author: {},
    }
  },
  async fetch() {
    try {
      const response = await axios(
        'https://frankflitton.com/.netlify/functions/medium/'
      )
      this.posts = response.data.stories
      this.author = response.data.author
    } catch(error) {
      console.error(error)
    }
  },
}
</script>
