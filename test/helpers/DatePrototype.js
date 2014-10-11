"use strict";
var DatePrototype = require("../../lib/helpers/DatePrototype");

it("should be the same", function() {
  DatePrototype.should.equal(Date.prototype);
});
