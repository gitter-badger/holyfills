"use strict";
var array_slice = require("../../lib/helpers/array_slice");

it("should be the same", function() {
  array_slice.should.equal(Array.prototype.slice);
});
