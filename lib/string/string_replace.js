"use strict";
var assignProperty = require("../helpers/assignProperty");
var StringPrototype = require("../helpers/StringPrototype");
var isFunction = require("../helpers/isFunction");
var isRegex = require("../helpers/isRegex");

var string_replace = StringPrototype.replace;// Native, don't modify

module.exports = IS_STRING_REPLACE_WORKS_AS_EXPECTED ? string_replace : function (searchValue, replaceValue) {
  var isFn = isFunction(replaceValue);
  var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
  if (!isFn || !hasCapturingGroups) {
    return string_replace.call(this, searchValue, replaceValue);
  } else {
    var wrappedReplaceValue = function (match) {
      var length = arguments.length;
      var originalLastIndex = searchValue.lastIndex;
      searchValue.lastIndex = 0;
      var args = searchValue.exec(match) || [];
      searchValue.lastIndex = originalLastIndex;
      args.push(arguments[length - 2], arguments[length - 1]);
      return replaceValue.apply(this, args);
    };
    return string_replace.call(this, searchValue, wrappedReplaceValue);
  }
};

assignProperty(StringPrototype, "replace", module.exports, !IS_STRING_REPLACE_WORKS_AS_EXPECTED);
