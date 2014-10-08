"use strict";
var StringPrototype = require("../../lib/helpers/StringPrototype");

it("should be the same", function() {
  StringPrototype.should.equal(String.prototype);
});
