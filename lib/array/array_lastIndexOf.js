"use strict";
var assignProperty = require("../helpers/assignProperty");
var ArrayPrototype = require("../helpers/ArrayPrototype");
var arrayCanSplitString = require("../helpers/arrayCanSplitString");
var isString = require("../helpers/isString");
var toObject = require("../helpers/toObject");
var toUint32 = require("../helpers/toUint32");
var toInteger = require("../helpers/toInteger");

module.exports = HAS_ARRAY_LAST_INDEX_OF ? ArrayPrototype.lastIndexOf : function (sought /*, fromIndex */ ) {
  var self = arrayCanSplitString && isString(this) ? this.split("") : toObject(this),
      length = toUint32(self.length),
      i = length - 1;

  if (!length) {
    return -1;
  }

  if (arguments.length > 1) {
    i = Math.min(i, toInteger(arguments[1]));
  }

  // handle negative indices
  i = i >= 0 ? i : length - Math.abs(i);
  for (; i >= 0; i--) {
    if (i in self && self[i] === sought) {
      return i;
    }
  }
  return -1;
};

// ES5 15.4.4.15
// http://es5.github.com/#x15.4.4.15
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
assignProperty(ArrayPrototype, "lastIndexOf", module.exports, !IS_ARRAY_LAST_INDEX_OF_WORKS_AS_EXPECTED);
