module.exports = {
    settings: {
        'import/ignore': ['react-native'],
      },
  env: {
    browser: true,
    es2021: true,

    "react-native/react-native": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:import/recommended"],
  overrides: [],
//   parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-native"],
  rules: {

    "react-native/split-platform-components": 2,

    "no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "^_" }],
    "react/react-in-jsx-scope": "off"
  },
};
