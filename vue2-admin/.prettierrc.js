module.exports = {
  useTabs: false,
  tabWidth: 2,
  printWidth: 80, // 每行代码长度（默认80）
  semi: true, // 声明结尾使用分号(默认true)
  endOfLine: 'auto', // 换行符(默认lf)
  singleQuote: true, // 使用单引号（默认false）
  trailingComma: 'none', // 多行使用拖尾逗号（默认none） none | all
  arrowParens: 'avoid', // 箭头函数参数括号 默认avoid 可选 avoid | always
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  jsxSingleQuote: true, // 在JSX里用单引号代替双引号(默认false)
  jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: ['*.json', '.eslintrc', '.babelrc', '.stylelintrc', '.prettierrc'],
      options: {
        parser: 'json',
        tabWidth: 2
      }
    }
  ]
};

// https://www.jianshu.com/p/5b391536d8ca
