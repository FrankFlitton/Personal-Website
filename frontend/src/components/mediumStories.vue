<template>
  <b-container class="bg-white p-5">
    <b-row>
      <b-col cols="12" class="p-5">
        <h1>Posts From Medium</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="8" offset-lg="2" md="10" offset-md="1" cols="12" offset="0" class="mb-5"
        v-for="post in posts"
        :key="post.title"
      >
        <a :href="post.link" class="d-flex row text-dark text-left">
          <b-col md="8" cols="12">
            <h2>{{ post.title }}</h2>
            <p>{{ post.description }}</p>
          </b-col>
          <b-col md="4" cols="12">
            <img :src="post.image" class="w-100 p-0">
          </b-col>
        </a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      posts: []
    }
  },
  created: async function () {
    let posts = await axios.get('https://mediumpostsapi.herokuapp.com/?usermedium=frankflitton')
      .then((response) => {
        return response.data.dataMedium
      })
      .catch(error => console.error(error))
    this.posts = posts
  }
}
</script>
