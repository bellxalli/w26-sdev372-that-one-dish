/* eslint-env node */
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], // needed for Jest
    "@babel/preset-react" // JSX support
  ]
};