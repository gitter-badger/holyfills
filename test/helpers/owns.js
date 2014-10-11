"use strict";

describe("owns", function () {
  var owns,
      actual;

  before(function () {
    owns = require("../../lib/helpers/owns");
  });

  it("should works as expected", function () {
    var object = {sentinel: namedFunction};
    actual = owns(object, "sentinel");
    actual.should.equal(true);

    actual = owns(object, "prototype");
    actual.should.equal(false);

    function namedFunction () {}
  });
});
