"use strict";
var array_unshift = require("../../lib/helpers/array_unshift");

it("should be the same", function() {
  array_unshift.should.equal(Array.prototype.unshift);
});
