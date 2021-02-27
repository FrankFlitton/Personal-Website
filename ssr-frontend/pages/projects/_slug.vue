<template>
  <div class="project-page" :class="{ 'no-image-border': page.noImageBorder }">
    <imageSlider v-if="longDescHTML" />
    <v-container class="mb-15">
      <v-row>
        <v-col class="mt-15 text-xs-center">
          <h1 class="font-weight-regular text-h2 text-center mb-3">
            {{ page.title }}
          </h1>
          <v-row justify="center">
            <v-btn
              :href="page.projectUrl"
              target="_blank"
              text
              class="px-10 py-5 text-h6"
            >
              Buy
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="8" cols="12" class="mt-15">
          <div class="long-desc mb-15" v-html="longDescHTML"></div>
          <hr :class="[page.color]" class="mb-15" />
          <nuxt-content :document="page" />
        </v-col>
        <v-col md="3" offset-md="1" cols="12" fill-height class="p-relative">
          <v-row style="position: sticky; top: 0" class="pt-15">
            <v-col cols="12" class="d-flex d-md-none">
              <hr :class="[page.color]" class="mb-15 col-12 pa-0" />
            </v-col>
            <v-col cols="6" md="12" class="pb-md-0">
              <p class="mb-0 mt-1 font-weight-bold">Client</p>
              <p>
                <a
                  :href="page.clientUrl"
                  target="_blank"
                  class="text-decoration-none grey--text"
                >
                  {{ page.client }}
                </a>
              </p>
              <p class="mb-0 mt-1 font-weight-bold">Category</p>
              <p class="text-decoration-none grey--text">
                <a
                  :href="page.clientUrl"
                  target="_blank"
                  class="text-decoration-none grey--text"
                >
                  {{ page.client }}
                </a>
              </p>
            </v-col>
            <v-col cols="6" md="12" class="py-md-0">
              <p class="mb-0 mt-1 font-weight-bold">Contributions</p>
              <p class="grey--text">
                <span
                  v-for="contribution in page.contributions"
                  :key="'contribution_' + contribution"
                  class="d-block"
                >
                  ¶ {{ contribution }}
                </span>
              </p>
              <p class="mb-0 mt-1 font-weight-bold">Project Link</p>
              <p>
                <a
                  :href="page.projectUrl"
                  target="_blank"
                  class="text-decoration-none grey--text"
                >
                  See More
                </a>
              </p>
            </v-col>
            <v-col cols="12" class="d-flex d-md-none">
              <hr :class="[page.color]" class="mt-10 col-12 pa-0" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import imageSlider from '~/components/imageSlider.vue'

export default {
  components: {
    imageSlider,
  },
  async asyncData({ $content, params }) {
    console.log(params)
    const page = await $content('projects')
      .where({
        slug: params.slug,
      })
      .fetch()

    console.log(page)
    return {
      page: page[0],
    }
  },
  head() {
    return {
      title: this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.longDescription
        }
      ]
    }
  },
  computed: {
    longDescHTML() {
      if (!this.page['longDescription']) {
        return '<p></p>'
      }
      let longDesc = this.page.longDescription
      const searchRegExp = /\n\n/g
      longDesc = longDesc.replace(searchRegExp, '</p><p>')
      longDesc = '<p>' + longDesc + '</p>'
      return longDesc
    },
  },
}
</script>

<style lang="scss">
.project-page {
  .long-desc p {
    font-size: 1.6em;
  }
  hr {
    height: 5px;
    width: 68%;
    border: none;
  }
}
</style>
