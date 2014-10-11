"use strict";

describe("prototype.valueOf", function () {
  var actual;

  before(function() {
    require("../../lib/date/date_constructor");
  });

  beforeEach(function () {
    // Note that new Date(1970, 0).valueOf() is 0 in UTC timezone.
    // Check check that it"s a number (and an int), not that it"s "truthy".
    actual = (new Date(1970, 0)).valueOf();
  });

  it("should be a polyfill", function () {
    Date.toString().should.not.containEql("[native code]");
  });

  it("should give a numeric value", function () {
    actual.should.be.type("number");
  });

  it("should not be NaN", function () {
    isNaN(actual).should.not.be.ok;
  });

  it("should give an int value", function () {
    actual.should.equal(Math.floor(actual));
  });
});
