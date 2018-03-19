<template>
  <div class="portfolio">
    <b-container>
      <b-row>
        <b-col class="text-center">
          <h1 v-html="page.title"></h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="left-col" cols="12" md="9">
          <b-row>
            <b-col>
              <h2 v-html="uriDecode(page.description)"></h2>
              <p class="body" v-html="uriDecode(page.body)"></p>
            </b-col>
          </b-row>
          <b-row class="d-none d-md-flex">
            <b-col cols="10">
              <div class="divider" :style="{'background': page.color}"></div>
            </b-col>
          </b-row>


          <!-- Page Sections Start -->

          <b-row
          v-for="(block, index) in page.html"
          :key="'block' + index"
          class="blocks"
          >
            <b-col
            v-if="block.type === 'text'"
            class="block text text-center"
            cols="10"
            offset="1"
            >
              <span v-html="uriDecode(block.text)"></span>
            </b-col>

            <b-col
            v-else-if="block.type === 'image' || block.type === 'gif'"
            class="block images"
            cols="12"
            >
              <b-row 
              v-for="image in block.images"
              :key="image.title"
              class="image"
              >
                <b-col>
                  <img 
                  :src="image.url" 
                  :alt="image.title"
                  :width="image.width"
                  :height="image.height"
                  >
                </b-col>
              </b-row>
            </b-col>
            <b-col
            v-else
            class="block exception"
            cols="12"
            >
            exception
            </b-col>
          </b-row>


        </b-col>
        <b-col class="right-col" cols="12" offset="0" offset-sm="0" md="2" offset-lg="1">
          <b-row class="d-flex d-md-none">
            <b-col cols="12">
              <div class="divider mb-4 mt-4" :style="{'background': page.color}"></div>
            </b-col>
          </b-row>
          <b-row class="position-sticky">
            <b-col cols="6" md="12">
              <h5><strong>Client</strong></h5>
              <p>
                <a v-html="page.client" :href="page.clientUrl" target="_blank"></a>
              </p>
            </b-col>
            <b-col cols="6" md="12">
              <h5><strong>Category</strong></h5>
              <p v-html="page.category"></p>
            </b-col>
            <b-col cols="6" md="12"
             class="contributions"
            >
              <h5><strong>Contributions</strong></h5>
              <span v-html="uriDecode(page.contributions)"></span>
            </b-col>
            <b-col cols="6" md="12"
             class="contributions"
             v-if="page.projectUrl"
            >
              <h5><strong>Project Link</strong></h5>
              <p>
                <a :href="page.projectUrl" target="_blank">See More</a>
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="d-flex d-md-none">
        <b-col cols="12">
          <div class="divider mt-3" :style="{'background': page.color}"></div>
        </b-col>
      </b-row>

      

    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'portfolio',
  methods: {
    uriDecode: function (message) {
      return decodeURIComponent(message)
    }
  },
  created () {
    axios.get(`http://frankflitton.com/pages/` + this.$route.params.id + `/json`)
    .then(response => {
      console.log(response.data)
      // JSON responses are automatically parsed.
      this.page = response.data.page
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  data () {
    return {
      page: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../styles/variables.scss';

.portfolio {
  text-align: left;
  background: #dadada;
  background: #ffffff;
  .container {
    background: white;
    min-height: 100vh;
    max-width: 1200px;
  }
  h1 {
    font-size: 4em;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }
  h2, {
    margin-bottom: 1em;
  }
  .body {
    font-size: 1.5em;
    line-height: 1.5em;
    margin-bottom: 3em;
  }
  .divider {
    width: 100%;
    height: 5px;
    margin-bottom: 5em;
  }
  .right-col {
    .row {
      top: 25vh;
    }
    h5 {
      font-size: 1rem;
      color: black;
      margin-bottom: 0.5em;
    }
    p, a {
      font-size: 1rem;
      color: grey;
    }
    .contributions p:not(:last-child) {
      margin-bottom: 0px;
    }
  }
  .blocks {
    background: #fbfbfb;
  }
  .block {
    padding-top: 3em;
    padding-bottom: 3em;
    width: 100%;
    
    &.images {
      background: #efefef;
      background: white;
    }
    &.exception {
      color: red;
      background: purple;
      font-weight: 900;
      font-size: 80px;
    }
  }
  img {
    max-width: 100%;
    margin: 0 auto;
    display: table-cell;
    height: auto;
    width: auto;
    max-height: 89vh;
  }
  iframe {
    width: 100%;
    height: 45vw;
    margin: 0 auto;
    max-height: 500px;
    display: block;
  }
} 
</style>
