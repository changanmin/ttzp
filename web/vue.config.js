module.exports = {
  outputDir: "../server/public/dist",
  publicPath: './',
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: 'http://localhost:3000',
  },
  chainWebpack: (config) => {
    config.plugin('html').tap(args => {
      args[0].title = "采购清单生成";
      return args;
    })
  }
};
