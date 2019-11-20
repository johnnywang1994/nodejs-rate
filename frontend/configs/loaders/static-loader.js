module.exports = {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 1000,
        outputPath: 'images'
      },
    },
  ],
}