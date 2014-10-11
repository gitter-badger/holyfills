"use strict";
var webpack = require("webpack");

var IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_NOOP_EMPTY_ARRAY = false,
    IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_EMPTY_OBJECT = false,
    IS_ARRAY_FOREACH_WORKS_AS_EXPECTED = false,
    HAS_ARRAY_FOREACH = false,
    IS_ARRAY_MAP_WORKS_AS_EXPECTED = false,
    HAS_ARRAY_MAP = false,
    IS_ARRAY_FILTER_WORKS_AS_EXPECTED = false,
    HAS_ARRAY_FILTER = false,
    IS_ARRAY_EVERY_WORKS_AS_EXPECTED = false,
    HAS_ARRAY_EVERY = false,
    IS_ARRAY_SOME_WORKS_AS_EXPECTED = false,
    HAS_ARRAY_SOME = false,
    IS_ARRAY_REDUCE_WORKS_AS_EXPECTED = false,
    HAS_ARRAY_REDUCE = false,
    IS_ARRAY_REDUCE_RIGHT_WORKS_AS_EXPECTED = false,
    HAS_ARRAY_REDUCE_RIGHT = false,
    IS_ARRAY_INDEX_OF_WORKS_AS_EXPECTED = false,
    HAS_ARRAY_INDEX_OF = false,
    VAR_PLACEHOLDER;

module.exports = {
  entry: "./lib/index.js",
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
      IS_ARRAY_FOREACH_WORKS_AS_EXPECTED: IS_ARRAY_FOREACH_WORKS_AS_EXPECTED,
      HAS_ARRAY_FOREACH: IS_ARRAY_FOREACH_WORKS_AS_EXPECTED && HAS_ARRAY_FOREACH,
      IS_ARRAY_MAP_WORKS_AS_EXPECTED: IS_ARRAY_MAP_WORKS_AS_EXPECTED,
      HAS_ARRAY_MAP: IS_ARRAY_MAP_WORKS_AS_EXPECTED && HAS_ARRAY_MAP,
      IS_ARRAY_FILTER_WORKS_AS_EXPECTED: IS_ARRAY_FILTER_WORKS_AS_EXPECTED,
      HAS_ARRAY_FILTER: IS_ARRAY_FILTER_WORKS_AS_EXPECTED && HAS_ARRAY_FILTER,
      IS_ARRAY_EVERY_WORKS_AS_EXPECTED: IS_ARRAY_EVERY_WORKS_AS_EXPECTED,
      HAS_ARRAY_EVERY: IS_ARRAY_EVERY_WORKS_AS_EXPECTED && HAS_ARRAY_EVERY,
      IS_ARRAY_SOME_WORKS_AS_EXPECTED: IS_ARRAY_SOME_WORKS_AS_EXPECTED,
      HAS_ARRAY_SOME: IS_ARRAY_SOME_WORKS_AS_EXPECTED && HAS_ARRAY_SOME,
      IS_ARRAY_REDUCE_WORKS_AS_EXPECTED: IS_ARRAY_REDUCE_WORKS_AS_EXPECTED,
      HAS_ARRAY_REDUCE: IS_ARRAY_REDUCE_WORKS_AS_EXPECTED && HAS_ARRAY_REDUCE,
      IS_ARRAY_REDUCE_RIGHT_WORKS_AS_EXPECTED: IS_ARRAY_REDUCE_RIGHT_WORKS_AS_EXPECTED,
      HAS_ARRAY_REDUCE_RIGHT: IS_ARRAY_REDUCE_RIGHT_WORKS_AS_EXPECTED && HAS_ARRAY_REDUCE_RIGHT,
      IS_ARRAY_INDEX_OF_WORKS_AS_EXPECTED: IS_ARRAY_INDEX_OF_WORKS_AS_EXPECTED,
      HAS_ARRAY_INDEX_OF: IS_ARRAY_INDEX_OF_WORKS_AS_EXPECTED && HAS_ARRAY_INDEX_OF,
    })
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
