const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const IS_PROD = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 输出路径
  assetsDir: 'static', // 生成静态目录的文件夹
  lintOnSave: true,
  runtimeCompiler: true, // 是否可以使用template模板
  parallel: require('os').cpus().length > 1, // 多余1核cpu时 启动并行压缩
  productionSourceMap: !IS_PROD, // 生产环境下 不使用soruceMap
  // eslint-disable-next-line no-dupe-keys
  parallel: require('os').cpus().length > 1,
  css: {
    requireModuleExtension: false,
    extract: true,
    sourceMap: false
  },
  chainWebpack: config => {
    config.resolve.symlinks(true)
    config.resolve.alias.set('@', resolve('src'))
    // 图片压缩
    config.module
      .rule('image')
      .test(/\.(png|jpg|jpeg|gif|svg)(\?.*)?$/)
      .use('img-loader')
      .loader('img-loader')
      .options({
        plugins: [
          require('imagemin-jpegtran')(),
          require('imagemin-pngquant')({
            quality: [0.75, 0.85]
          })
        ]
      })
  },
  configureWebpack: config => {
    config.plugins.push(
      new StyleLintPlugin({
        context: 'src',
        files: ['**/*.css', '**/*.scss', '**/*.vue', '**/*.sass', '**/*.less'],
        fix: true
      })
    )
    const plugins = []
    if (IS_PROD) {
      // gzip压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
  }
}
