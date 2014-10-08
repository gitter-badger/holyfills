"use strict";
var array_splice = require("../../lib/helpers/array_splice");

it("should be the same", function() {
  array_splice.should.equal(Array.prototype.splice);
});
