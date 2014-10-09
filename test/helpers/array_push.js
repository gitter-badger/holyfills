"use strict";
var array_push = require("../../lib/helpers/array_push");

it("should be the same", function() {
  array_push.should.equal(Array.prototype.push);
});
