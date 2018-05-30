module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'google', 'standard-react'],
  rules: {
    'no-console': 'off', // override eslint:recommended
    'require-jsdoc': 'off', // override google
    'valid-jsdoc': 'off', // override google
    'object-curly-spacing': 'off', // override google
    'no-invalid-this': 'off', // override google
    'no-trailing-spaces': 'off', // override google
    'max-len': [1, 120, 2, { ignoreComments: true }], // override google
    'space-before-function-paren': [
      1,
      {
        asyncArrow: 'always',
        anonymous: 'always',
        named: 'never',
      },
    ], // override google
    'padded-blocks': [1, 'never'], // override google
    'jsx-quotes': [1, 'prefer-double'], // override standard-react
  },
};