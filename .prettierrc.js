const organizeImports = require('prettier-plugin-organize-imports')

module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  plugins: [organizeImports],
}
