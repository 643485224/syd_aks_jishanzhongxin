module.exports = {
    //   lintOnSave: false,
    //   devServer: {
    //     open: true, //是否自动打开浏览器
    //     // https: false, //是否开启https
    //     // hotOnly: false,
    //     // proxy: {
    //     //   // 配置跨域
    //     //   "/api": {
    //     //     target: "http://********", //请求接口域名
    //     //     ws: true,
    //     //     secure: false,
    //     //     changOrigin: true, //是否允许跨越
    //     //     pathRewrite: {
    //     //       "^/api": "",
    //     //     },
    //     //   },
    //     // },
    //     // before: (app) => {},
    //   },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"));
    }
};
