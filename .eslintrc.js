module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "eslint:recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/extensions": 0,
    "vue/require-default-prop": 0,
  },
};
