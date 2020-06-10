const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const smp = new SpeedMeasurePlugin()
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(dir) {
  return path.join(__dirname, dir)
}

const configuration = config => {
  const _config = {
    externals: {
      AMap: 'AMap',
      AMapUI: 'AMapUI'
    },
    plugins: [
      // new VueLoaderPlugin()
    ]
  }

  // 生产环境取消 console.log
  if (process.env.NODE_ENV === 'production') {
    // 为生产环境修改配置

    _config.plugins.push(
      new TerserPlugin({
        parallel: 4,
        cache: true,
        exclude: /\/node_modules/,
        terserOptions: {
          keep_fnames: true,
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    )

    _config.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.css$|\.ttf$|\.html$|\.svg$|\.json$|\.js$/,
        // test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 0,
        minRatio: 0.8,
        deleteOriginalAssets: true // 删除原文件
      })
    )
    // _config.plugins.push(
    //   new HappyPack({
    //     id: 'js',
    //     loaders: [
    //       {
    //         loader: 'babel-loader?cacheDirectory=true'
    //       }
    //     ],
    //     threadPool: happyThreadPool,
    //     verbose: true
    //   })
    // )

    // _config.plugins.push(
    //   new HappyPack({
    //     id: 'styles',
    //     threadPool: happyThreadPool,
    //     loaders: ['vue-style-loader', 'css-loader', 'less-loader']
    //   })
    // )

    // 优化测试工具，待注释
    // _config.plugins.push(
    //   new WebpackBar({
    //     profile: true,
    //     reporters: ['profile'] // 注意这里的配置很关键，否则没信息
    //   })
    // )
  }

  return _config
}

// vue.config.js
module.exports = {
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  // 打包app时放开该配置
  // publicPath:'./',
  configureWebpack: smp.wrap(configuration),

  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))

    // 配置 webpack 识别 markdown 为普通的文件
    // config.module = {
    //   rules: [
    //     { test: /\.md$/, loader: 'file-loader' },
    //     {
    //       test: /\.js$/,
    //       use: 'happypack/loader?id=js',
    //       exclude: /node_modules/
    //     },
    //     {
    //       test: /\.vue$/,
    //       use: 'happypack/loader?id=vue',
    //       exclude: /node_modules/
    //     }
    //   ]
    // }
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('happypack/loader?id=vue')
      .loader('happypack/loader?id=vue')
      .end()
    if (process.env.NODE_ENV === 'production') {
      // config.module
      //   .rule('styles')
      //   .test(/\.less$/)
      //   .use('happypack/loader?id=styles')
      //   .loader('happypack/loader?id=styles')
      //   .end()

      config.module
        .rule('markdown')
        .test(/\.md$/)
        .use('happypack/loader?id=js')
        .loader('happypack/loader?id=vue')
        .end()

      // const jsRule = config.module.rule('js')
      // jsRule.uses.clear()
      // jsRule
      //   .use('happypack/loader?id=js')
      //   .loader('happypack/loader?id=js') // .exclude(/node_modules/)
      //   .end()
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          'primary-color': '#1890FF',
          'link-color': '#1890FF',
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://218.6.64.250:60118/gswl-boot',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
      // '/api': {
      //   target: 'http://192.168.1.128:8080/gswl-boot',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '/api': ''
      //   }
      // }
    }
  },
  lintOnSave: false
}
