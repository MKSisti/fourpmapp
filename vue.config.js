// vue.config.js
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // options...
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [{ from: "./src/assets", to: "assets" }],
      }),
    ],
  },
};
