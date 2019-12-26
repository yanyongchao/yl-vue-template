const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    config.plugins.push(
      new StyleLintPlugin({
        context: 'src',
        files: ['**/*.css', '**/*.scss', '**/*.vue', '**/*.sass', '**/*.less'],
        fix: true
      })
    )
  }
}
