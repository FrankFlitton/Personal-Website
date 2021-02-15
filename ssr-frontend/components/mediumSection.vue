<template>
  <div class="medium-section w-100 mb-15">
    <v-row>
      <v-col>
          <v-btn
            href="http://frankflitton.medium.com/"
            target="_blank"
            class="px-0 mx-0"
            color="white"
            elevation="0"
          >
            <v-icon class="black--text">mdi-book</v-icon>&nbsp;<h2>Blog Posts</h2>
          </v-btn>
      </v-col>
    </v-row>
    <transition name="fade">
      <preloader v-if="$fetchState.pending" style="height: 400px !important; filter: invert(1) hue-rotate(45deg)"/>

      <v-row
        v-if-else
        v-for="post in posts"
        :key="post.link"
        class="mb-5"
      >
        <v-col
          cols="12"
          class="d-flex d-md-none"
        >
          <v-img :src="post.image"></v-img>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-row>
            <v-col cols="12">
              <a :href="post.link" class="black--text">
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
        <v-col
          cols="4"
          class="d-none d-md-flex"
        >
          <v-img :src="post.image"></v-img>
        </v-col>
      </v-row>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import preloader from '~/components/preloader.vue'

export default {
  components: {
    preloader
  },
  data () {
    return {
      posts: []
    }
  },
  async fetch () {
    this.posts = await axios('https://mediumpostsapi.herokuapp.com/?usermedium=frankflitton')
      .then((response) => {
        return response.data.dataMedium
      })
      .catch(error => console.error(error))
  }
}
</script>
