"use strict";
var webpack = require("webpack");

var IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_NOOP_EMPTY_ARRAY = false,
    IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_EMPTY_OBJECT = false;

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
      HAS_DESCRIPTORS_SUPPORT: false,
      IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_NOOP_EMPTY_ARRAY: IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_NOOP_EMPTY_ARRAY,
      IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_EMPTY_OBJECT: IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_EMPTY_OBJECT,
      IS_ARRAY_SPLICE_WORKS_AS_EXPECTED: IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_NOOP_EMPTY_ARRAY && IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_EMPTY_OBJECT,
      IS_ARRAY_UNSHIFT_WORKS_AS_EXPECTED: false,
      HAS_ARRAY_PROTOTYPE_FOREACH: false
    })
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
