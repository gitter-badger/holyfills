"use strict";
var assignProperty = require("../helpers/assignProperty");
var ArrayPrototype = require("../helpers/ArrayPrototype");
var array_splice = require("../helpers/array_splice");
var toInteger = require("../helpers/toInteger");
var array_slice = require("../helpers/array_slice");

module.exports = IS_ARRAY_SPLICE_WORKS_AS_EXPECTED ? array_splice : function (start, deleteCount) {
  var args = arguments;
  if (args.length === 0) {
    return [];
  } else {
    if (!IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_EMPTY_OBJECT) {
      this.length = Math.max(toInteger(this.length), 0);
      if (args.length > 0 && typeof deleteCount !== "number") {
        args = array_slice.call(args);
        if (args.length < 2) {
          args.push(this.length - start);
        } else {
          args[1] = toInteger(deleteCount);
        }
      }
    }
    return array_splice.apply(this, args);
  }
};

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.12
assignProperty(ArrayPrototype, "splice", module.exports, !IS_ARRAY_SPLICE_WORKS_AS_EXPECTED);
