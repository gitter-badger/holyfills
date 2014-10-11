"use strict";
var function_bind = require("../function/function_bind");
var FunctionPrototype = require("../helpers/FunctionPrototype");
var ObjectPrototype = require("../helpers/ObjectPrototype");

module.exports = function_bind.call(FunctionPrototype.call, ObjectPrototype.hasOwnProperty);
