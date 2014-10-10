"use strict";

describe("assignProperty", function () {
  var assignProperty;

  before(function () {
    assignProperty = require("../../lib/helpers/assignProperty");
  });

  it("should be a custom function", function () {
    assignProperty.toString().should.not.containEql("[native code]");
  });

  it("should works as expected", function () {
    var object = {}
    assignProperty(object, "sentinel", namedFunction);

    object.should.have.property("sentinel", namedFunction);
    function namedFunction () {}
  });

  it("should works with force assign", function () {
    var object = {}
    assignProperty(object, "toString", namedFunction, true);

    object.should.have.property("toString", namedFunction);
    function namedFunction () {}
  });
});
