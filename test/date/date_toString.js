"use strict";

describe("prototype.toString", function () {
  var actual;

  before(function() {
    require("../../lib/date/date_constructor");
    actual = (new Date(1970, 0)).toString();
  });

  it("should be a polyfill", function () {
    Date.toString().should.not.containEql("[native code]");
  });

  it("should show correct date info for " + actual, function () {
    actual.should.match(/1970/);
    actual.should.match(/jan/i);
    actual.should.match(/thu/i);
    actual.should.match(/00:00:00/);
  });
});
