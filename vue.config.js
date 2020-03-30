const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: '/dic',
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/, // 匹配文件名
            threshold: 256, // 对超过10k的数据压缩
            deleteOriginalAssets: false, // 不删除源文件
            minRatio: 0.8, // 压缩比
          }),
        ],
      };
    }
    return {};
  },
};
