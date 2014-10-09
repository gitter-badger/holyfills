"use strict";

describe("isFunction", function () {
  var isFunction;

  before(function () {
    isFunction = require("../../lib/helpers/isFunction");
  });

  it("should be a custom function", function () {
    isFunction.toString().should.not.containEql("[native code]");
  });

  it("should be true for Function", function () {
    isFunction(function () {}).should.equal(true);
    isFunction(namedFunction).should.equal(true);

    function namedFunction () {}
  });

  it("should be false for primitives", function () {
    var primitives = [
      "foo",
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
      isFunction(v).should.equal(false);
    });
  });

  it("should fail for objects", function () {
    var objects = [
      {},
      [undefined, null, 1],
      /foo/,
      arguments
    ];
    if (Object.create) {
      objects.push(Object.create(null));
    }

    objects.forEach(function (v) {
      isFunction(v).should.equal(false);
    });
  });

  if (typeof document !== "undefined") {
    it("should be false for an HTML element", function () {
      var el = document.getElementsByTagName("div");
      isFunction(el).should.equal(false);
    });
  }
});
