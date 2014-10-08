"use strict";
var object_to_string = require("../helpers/object_to_string");

module.exports = HAS_ARRAY_IS_ARRAY ? Array.isArray : function(obj) {
  return object_to_string.call(obj) === "[object Array]";
};
