module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: 'http://localhost:3000',
  },
};
