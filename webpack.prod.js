const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  return merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(sa|sc|c|le)ss$/i,
          use: [
            MiniCssExtractPlugin.loader, // css文件单独提取出来
            {
              loader: 'css-loader',
              options: {
	              // modules: true, // 开启css模块化,但vue-loader有scope，不需要开启
                importLoaders: 2 //在css-loader之前，允许有几个loader来预处理
              },
            },
            'postcss-loader',
            'sass-loader',
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(
        {
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css',
        }
      ),
    ],
    optimization: {
      minimizer: [
        // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
        '...',
        new CssMinimizerPlugin()
      ],
    },
  })

}
