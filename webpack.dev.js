// const path = require('path');
const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = (env, argv) => {
  return merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      host: '0.0.0.0',
      port: 8080,
      // 对该目录启动一个静态服务
      // static: {
      //     directory: path.join(__dirname, './dist'),
      // },
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
          changeOrigin: true,// 将localhost域名改变成target，服务端可见，浏览器端依旧localhost
          secure: false // 允许不安全的后端服务，例如没有证书的https
        },
      }
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c|le)ss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                // modules: true, // 开启css模块化,但vue-loader有scope，不需要开启
	              importLoaders: 2 //在css-loader之前，允许有几个loader来预处理
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
      ]
    }
  })

}

