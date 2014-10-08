"use strict";
var FunctionPrototype = require("../../lib/helpers/FunctionPrototype");

it("should be the same", function() {
  FunctionPrototype.should.equal(Function.prototype);
});
