/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100, // set your threshold
  singleQuote: true,
  trailingComma: 'es5',
  plugins: [
    'prettier-plugin-tailwindcss',
    'prettier-plugin-classnames',
  ],
  // optional: how to wrap classes, 'absolute' is usually what you want
  endingPosition: 'absolute',
};