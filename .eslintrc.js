module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base','prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "class-methods-use-this":"off",
    "no-param-reassign":"off",
    "camelcase":"off",
    "no-unused-vars":["error",{"argsIgnorePattern": "next"}],
    "linebreak-style": 0,
    "prettier/prettier":"error"
  },
  plugins: [
    'prettier'
  ],
};
