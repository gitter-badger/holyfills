"use strict";
var ObjectPrototype = require("./ObjectPrototype");

// Notice: Having a toString local variable name breaks in Opera.
module.exports = ObjectPrototype.toString;
