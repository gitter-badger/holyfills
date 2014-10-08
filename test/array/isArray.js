"use strict";

describe("isArray", function () {
  var isArray;

  before(function () {
    isArray = require("../../lib/array/isArray");
  });

  it("should be a polyfill", function () {
    isArray.toString().should.not.equal("function isArray() { [native code] }");
  });

  it("should be true for Array", function () {
    isArray([]).should.equal(true);
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
      isArray(v).should.equal(false);
    });
  });

  it("should fail for other objects", function () {
    var objects = [
      {},
      /foo/,
      arguments
    ];
    if (Object.create) {
      objects.push(Object.create(null));
    }

    objects.forEach(function (v) {
     	isArray(v).should.equal(false);
    });
  });

  if (typeof document !== "undefined") {
    it("should be false for an HTML element", function () {
      var el = document.getElementsByTagName("div");
      isArray(el).should.equal(false);
    });
  }
});
