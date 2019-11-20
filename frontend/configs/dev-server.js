module.exports = {
  port: 8081,
  overlay: { errors: true },
  proxy: {
    '/api': {
      target: 'http://localhost:8080/',
      // pathRewrite: {'^/api' : ''},
      changeOrigin: true
    },
  }
}