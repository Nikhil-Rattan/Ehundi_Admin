module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Add this line to recognize Node.js globals
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", // or your preferred React rules
    "plugin:@typescript-eslint/recommended", // if using TypeScript
  ],
  parser: "@babel/eslint-parser", // or the parser you're using
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // Your custom rules here
  },
};
