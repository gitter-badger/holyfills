"use strict";

describe("toInteger", function () {
  var toInteger;

  before(function () {
    toInteger = require("../../lib/helpers/toInteger");
  });

  it("should be a custom function", function () {
    toInteger.toString().should.not.containEql("[native code]");
  });

  it("should convert number like values", function () {
    toInteger(0).should.equal(0);
    toInteger(true).should.equal(1);
    toInteger(-3.14159).should.equal(-3);
    toInteger(Math.sin(10)).should.equal(0);
  });

  it("should be 0 for other values", function () {
    var values = [
      "foo",
      "$8.72",
      "This is -396sd",
      false,
      NaN,
      {},
      [undefined, null, 1],
      /foo/,
      arguments,
      function () {},
      namedFunction
    ];
    values.forEach(function (v) {
      toInteger(v).should.equal(0);
    });
    function namedFunction () {}
  });

  if (typeof document !== "undefined") {
    it("should be 0 for an HTML element", function () {
      var el = document.getElementsByTagName("div");
      toInteger(el).should.equal(0);
    });
  }
});
