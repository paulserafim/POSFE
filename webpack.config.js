const path = require("path");
const assets = ["manifest.json", "sw.js"];

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    writeToDisk: true,
  },
};
