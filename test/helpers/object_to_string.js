"use strict";
var object_to_string = require("../../lib/helpers/object_to_string");

it("should be the same", function() {
  object_to_string.should.equal(Object.prototype.toString);
});
