# yl-vue-template

### 项目简介
记录vue-cli3的一些配置，基本能满足我们日常的开发需求

### 1.用vue cl3初始化项目
vue create yl-vue-template, 我这里eslint用的是standard


### 2.添加stylelint校验css
2.1 添加stylelint包依赖

npm install stylelint stylelint-config-standard stylelint-order stylelint-webpack-plugin fs-css-order

2.2 根新建stylelint.config.js
```
module.exports = {
  root: true,
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'rule-empty-line-before': 'never',
    'number-leading-zero': 'never',
    'function-comma-space-after': 'never',
    'function-url-quotes': 'never',
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'extend']
    }],
    'order/properties-order': require('fs-css-order').propertiesOrder
  }
}
```
2.3 新增stylelint忽略文件
```
*.js
*.png
*.eot
*.ttf
*.woff
```
2.4新建vue.config.js
```
configureWebpack: config => {
  config.plugins.push(
    new StyleLintPlugin({
      context: 'src',
      files: ['**/*.css', '**/*.scss', '**/*.vue', '**/*.sass', '**/*.less'],
      fix: true
    })
  )
}
```
### git提交校验文件
npm install lint-staged -D

修改package.json
```
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.js": [
      "vue-cli-service lint",
      "git add"
    ],
    "*.vue": [
      "vue-cli-service lint",
      "stylelint --fix",
      "git add"
    ],
    "*.css": [
      "stylelint --fix",
      "git add"
    ],
    "*.less": [
      "stylelint --fix",
      "git add"
    ],
    "*.scss": [
      "stylelint --fix",
      "git add"
    ]
  }
```
