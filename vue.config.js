const path = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const TerserPlugin = require('terser-webpack-plugin')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

// const proxyTarget = 'http://192.168.1.118:8080/gswl-boot/' // 林武
const proxyTarget = 'http://218.6.64.250:60118/gswl-boot/' // 测试环境

function resolve(dir) {
  return path.join(__dirname, dir)
}

const configuration = config => {
  const _config = {
    externals: {
      AMap: 'AMap',
      AMapUI: 'AMapUI'
    },
    plugins: []
  }

  // 生产环境取消 console.log
  if (process.env.NODE_ENV === 'production') {
    // _config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
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
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    )
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
  // configureWebpack: {
  //   externals: {
  //     AMap: 'AMap'
  //   }
  // },
  chainWebpack: config => {
    // console.log('loader', config.module)
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))

    // 配置 webpack 识别 markdown 为普通的文件
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use()
      .loader('file-loader')
      .end()
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
        target: proxyTarget,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // lintOnSave: 'error'
  lintOnSave: false
}
