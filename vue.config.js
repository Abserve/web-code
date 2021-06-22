module.exports = {
  devServer: {
    host: '0.0.0.0',
    https: false,
    port: 8080,
    public: 'http://0.0.0.0:8080'
  },
  "transpileDependencies": [
    "vuetify"
  ],
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  pwa: {
    iconPaths: {
        favicon32: 'logo.png',
        favicon16: 'logo.png',
        appleTouchIcon: 'logo.png',
        maskIcon: 'logo.png',
        msTileImage: 'logo.png'
    }
  }
}

