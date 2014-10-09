"use strict";

describe("isString", function () {
  var isString;

  before(function () {
    isString = require("../../lib/helpers/isString");
  });

  it("should be a custom function", function () {
    isString.toString().should.not.containEql("[native code]");
  });

  it("should be true for String", function () {
    isString("String").should.equal(true);
    isString(new String("true")).should.equal(true);
  });

  it("should be false for primitives", function () {
    var primitives = [
      true,
      false,
      42,
      0,
      -0,
      NaN,
      Infinity,
      -Infinity
    ];
    primitives.forEach(function (v) {
      isString(v).should.equal(false);
    });
  });

  it("should fail for objects", function () {
    var objects = [
      {},
      [undefined, null, 1],
      /foo/,
      arguments,
      function () {},
      namedFunction
    ];
    if (Object.create) {
      objects.push(Object.create(null));
    }

    objects.forEach(function (v) {
      isString(v).should.equal(false);
    });
    function namedFunction () {}
  });

  if (typeof document !== "undefined") {
    it("should be false for an HTML element", function () {
      var el = document.getElementsByTagName("div");
      isString(el).should.equal(false);
    });
  }
});
