const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  entry: {
    index: './src/main.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js', // 动态模块文件名
    chunkLoading: 'jsonp', // 加载chunk的方法，jsonp对应target：web端
    crossOriginLoading: 'use-credentials', // 携带凭据(credential) 启用跨域加载，仅target：web端有效
    assetModuleFilename: 'assets/[hash][ext][query]', // Asset Modules资源输出到该位置
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    // noParse: /jquery|lodash/, // 忽略模块依赖解析
    rules: [
	    {
		    test: /\.vue$/,
		    loader: 'vue-loader'
	    },
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 编译结果缓存到默认目录
              cacheCompression: false // 缓存不需要压缩
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过10kb就是链接形式，不是内链资源了
          }
        },
        generator: {
          filename: 'images/[hash][ext][query]' // 这个图片类型的文件输出到该位置
        },
        type: 'asset',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过10kb就是链接形式，不是内链资源了
          }
        },
        generator: {
          filename: 'fonts/[hash][ext][query]' // 这个字体类型的文件输出到该位置
        },
        type: 'asset',
      },
    ],
  },
  resolve: {
    alias: {
	    // 'vue$': 'vue/dist/vue.runtime.esm-bundler.js', 默认值
      '@': path.resolve(__dirname, 'src/')
    },
  },
  plugins: [
	  new VueLoaderPlugin(),
	  // 多页应用就创建多个new HtmlWebpackPlugin()，生成多个html
    new HtmlWebpackPlugin({
      title: '从零搭建webpack+vue3',
      favicon: '',
      template: './public/index.html',
      filename: '[name].html', // [name]和[contenthash]
      // chunks: ['index1'] // chunks来决定单个页面中引入哪些资源
      // hash: true // 所有引入的资源都加上哈希值，尤其现在css被单独抽离，强刷缓存
    }),
    new ESLintPlugin({
      extensions: ['js', 'vue'],
	    // fix: true
    }),
	  new StyleLintPlugin({
		  files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
		  // fix: true
	  }),
  ],
  optimization: {
    moduleIds: 'deterministic', //新增一个模块后，vendor的内容哈希值会变化，该配置使它哈希值不会变
    runtimeChunk: 'single', // 提取引导模板即运行时代码，为了利用浏览器缓存机制，减少请求
    splitChunks: { // 所有node_modules包的模块代码合并,为了利用浏览器缓存机制，减少请求
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    usedExports: true, // treeshaking的一种方式
  }
}
