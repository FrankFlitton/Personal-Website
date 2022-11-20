import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Frank JE Flitton',
    title: 'Developer and Designer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Frank is a Full Stack Software Engineer and Lead Designer specializing in software engineering, UX research, and product design. Available for freelance and other opportunities.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://www.npmjs.com/package/nuxt-github-api
    '@nuxtjs/sitemap',
    //https://www.npmjs.com/package/@nuxtjs/sitemap
    [
      'nuxt-github-api',
      {
        // token: required by the GitHub API
        token: process.env.GITHUB_API_TOKEN,

        // graphQLQuery: defaults to a search query
        graphQLQuery: `
          query GetUser($login: String!) {
            user(login: $login) {
              avatarUrl
              pinnedItems(first: 10) {
                totalCount
                nodes {
                  ... on Repository {
                    id
                    name
                    homepageUrl
                    url
                    description
                    openGraphImageUrl
                    latestRelease {
                      name
                      tagName
                    }
                    stargazerCount
                    usesCustomOpenGraphImage
                    repositoryTopics(first: 10) {
                      nodes {
                        topic {
                          name
                          id
                        }
                      }
                    }
                  }
                }
              }
              url
              twitterUsername
            }
          }
          `,

        // variables: Object which includes any GraphQL variables required by your query.
        variables: {
          login: 'frankflitton'
        }
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Nuxt Sitemap module configuration: https://www.npmjs.com/package/@nuxtjs/sitemap#usage
  sitemap: {
    hostname: 'https://frankflitton.com',
    gzip: true,
    exclude: [
      '/inspire',
      '/admin/**',
      '/.netlify/**',
    ],
    routes: async () => {
      // Great Examples using Nuxt $content
      // https://redfern.dev/articles/adding-a-sitemap-using-nuxt-content/

      const { $content } = require("@nuxt/content")

      const projects = await $content('projects')
        .only(['slug'])
        .fetch()
        .catch((error) => console.error(error))

      const projectUrls = projects.map(project => `/projects/${project.slug}/`)

      return [...projectUrls]
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/styles/variables.scss'],
    defaultAssets: {
      font: false
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
