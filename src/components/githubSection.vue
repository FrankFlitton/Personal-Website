<template>
  <div class="github-section w-100 mb-15">
    <v-row>
      <v-col>
        <v-btn
          :href="$github.user.url"
          target="_blank"
          class="px-0"
          color="white"
          elevation="0"
        >
          <v-icon class="black--text">mdi-github</v-icon>&nbsp;
          <h2>Open Source Code</h2>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="project in $github.user.pinnedItems.nodes"
        :key="project.id"
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <!-- <v-img
          height="250"
          :src="project.openGraphImageUrl"
        ></v-img> -->
        <v-card elevation="0" class="grey lighten-5">
          <v-card-title :class="[{ 'pb-0': project.stargazerCount > 0 }]">
            {{ titleCase(project.name) }}
          </v-card-title>

          <v-card-text v-if="project.stargazerCount" class="pb-0">
            <v-icon small color="grey">mdi-star</v-icon> ({{
              project.stargazerCount
            }})
          </v-card-text>

          <v-card-text>
            <p>{{ project.description }}</p>
            <v-chip-group
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip
                v-for="node in project.repositoryTopics.nodes"
                :key="node.topic.id"
                >{{ node.topic.name }}
              </v-chip>
            </v-chip-group>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn
              v-if="project.url"
              :href="project.url"
              target="_blank"
              color="black lighten-3"
              text
            >
              GitHub
            </v-btn>
            <v-btn
              v-if="project.homepageUrl"
              :href="project.homepageUrl"
              target="_blank"
              color="black lighten-3"
              text
            >
              Example
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import capitalize from 'lodash/capitalize'

export default {
  methods: {
    titleCase(string) {
      return string
        .split('-')
        .map(capitalize)
        .join(' ');
    },
  },
}
</script>
