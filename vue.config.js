// 打包分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 压缩工具
const CompressionPlugin = require("compression-webpack-plugin");
// const productionGzipExtensions = ['js', 'css']
const productionGzipExtensions = /\.(js|css|json|txt|ico|svg)(\?.*)?$/i; // 可压缩文件类型
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
// const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    public: '199.168.22.18', //设置本地启动的地址
    port: 8081, //设置本地启动的端口号以侦听
    hotOnly: false, //启用热模块替换，而无需页面刷新作为构建失败时的回退
    proxy: {
      "/api": {
        target: "http://36.138.127.23:8081",
        // target: "http://199.168.22.8:8081",
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          "^/api": "",
        },
      }
    },
  },
  productionSourceMap: false,
  // productionGzip: true,
  // productionGzipExtensions: ['js','css'],
  // configureWebpack:{
  //   plugins: [
  //     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  //     new CompressionWebpackPlugin({
  //       algorithm: 'gzip',
  //       test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
  //       threshold: 10240,
  //       minRatio: 0.8
  //     }),
  //     new webpack.optimize.LimitChunkCountPlugin({
  //       maxChunks: 5,
  //       minChunkSize: 100
  //     })
  //   ]
  // }

  // configureWebpack: config => {
  //   config.optimization = {
  //     minimize: process.env.NODE_ENV === 'production',
  //     minimizer: [
  //       new TerserPlugin({
  //         test: /\.js(\?.*)?$/i, // 匹配参与压缩的文件
  //         parallel: true, // 使用多进程并发运行
  //         terserOptions: {
  //           // Terser 压缩配置
  //           output: { comments: false }
  //         },
  //         extractComments: false // 将注释剥离到单独的文件中
  //       })
  //     ]
  //   }
  // },

  lintOnSave: false,
  chainWebpack: (config) => {
    //  // 移除 preload(预载) 插件
    //  config.plugins.delete('preload')
    //  // 移除 prefetch(预取) 插件
    config.plugins.delete('prefetch')
    if (process.env.analyzer) {
      config.plugin("webpack-bundle-analyzer").use(new BundleAnalyzerPlugin());
    }
    if (isProduction) {
      // config.plugin("compression-webpack-plugin").use(new CompressionPlugin({
      //   test: /\.(js|css)$/,// 匹配文件名
      // }));
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          // filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: productionGzipExtensions, // 需要压缩的文件类型
          threshold: 10240, // 需要进行压缩的文件大小最小值  这里是 10k
          minRatio: 0.8, // // 只有压缩率小于这个值的资源才会被处理
          // deleteOriginalAssets: true //是否删除原文件
        })
      )
      // new webpack.optimize.LimitChunkCountPlugin({
      //   maxChunks: 5,
      //   minChunkSize: 100
      // })
    }
  },


};
