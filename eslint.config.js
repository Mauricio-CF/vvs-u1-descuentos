const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
    rules: {
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-unused-vars": "warn",
      curly: ["error", "all"],
      "no-console": "warn",
    },
  },
];