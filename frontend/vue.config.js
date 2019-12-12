// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  filenameHashing: true,
  chainWebpack: config => {
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: '[name].css?[hash]',
            chunkFilename: '[name].css?[hash]'
          }
        ])
    }
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true
      })
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000
      }
    },
    output: {
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js?[hash]'
    },
    // plugins: [
    //   new VuetifyLoaderPlugin(),
    // ],
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js'
        // vuex$: 'vuex/dist/vuex.esm.js'
      }
    }
  }
}
