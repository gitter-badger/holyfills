"use strict";
var assignProperty = require("../helpers/assignProperty");
var ArrayPrototype = require("../helpers/ArrayPrototype");
var toObject = require("../helpers/toObject");
var arrayCanSplitString = require("../helpers/arrayCanSplitString");
var isString = require("../helpers/isString");
var toUint32 = require("../helpers/toUint32");
var isFunction = require("../helpers/isFunction");

module.exports = HAS_ARRAY_SOME ? ArrayPrototype.some : function (fun /*, thisp*/) {
  var object = toObject(this),
      self = arrayCanSplitString && isString(this) ? this.split("") : object,
      length = toUint32(self.length),
      i = 0,
      thisp = arguments[1];

  // If no callback function or if callback is not a callable function
  if (!isFunction(fun)) {
    throw new TypeError(fun + " is not a function");
  }

  for (; i < length; i++) {
    if (i in self && fun.call(thisp, self[i], i, object)) {
      return true;
    }
  }
  return false;
};

// ES5 15.4.4.17
// http://es5.github.com/#x15.4.4.17
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
assignProperty(ArrayPrototype, "some", module.exports, !IS_ARRAY_SOME_WORKS_AS_EXPECTED);
