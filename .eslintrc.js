const isProduction = process.env.NODE_ENV === 'production';

const off = 0;
const warn = 1;
const error = 2;

module.exports = {
  extends: ['airbnb', 'plugin:import/errors', 'plugin:import/warnings'],
  plugins: ['import'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'comma-dangle': [
      error,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'consistent-return': off,
    'function-paren-newline': [error, 'consistent'],
    'import/extensions': off,
    'import/no-unresolved': off,
    indent: off,
    'max-len': [error, 150, { ignoreComments: true }],
    'no-console': isProduction ? error : off,
    'no-lonely-if': off,
    'no-multiple-empty-lines': [error, { max: error, maxEOF: error }],
    'no-implicit-coercion': error,
    'no-underscore-dangle': off,
    'no-unused-vars': [error, { args: 'after-used', ignoreRestSiblings: false }],
    'object-curly-newline': [error, { consistent: true }],
    'prefer-spread': off,
    'react/jsx-filename-extension': [error, { extensions: ['.js', '.jsx'] }],
    'react/no-typos': error,
    'react/no-unescaped-entities': off,
    'react/sort-comp': off,
  },
  parser: 'babel-eslint',
};
