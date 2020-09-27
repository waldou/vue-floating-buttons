const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: __dirname + '/src',
  output: {
    library: 'vue-floating-buttons',
    libraryTarget: 'umd',
    filename: 'FloatingButtons.js',
    path: __dirname + '/dist'
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
