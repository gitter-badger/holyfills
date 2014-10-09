"use strict";
var webpack = require("webpack");

module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      HAS_ARRAY_IS_ARRAY: false,
      HAS_FUNCTION_BIND: false,
      HAS_ARRAY_PROTOTYPE_FOREACH: false
    })
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
