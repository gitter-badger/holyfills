"use strict";

describe("isPrimitive", function () {
  var isPrimitive;

  before(function () {
    isPrimitive = require("../../lib/helpers/isPrimitive");
  });

  it("should be a custom function", function () {
    isPrimitive.toString().should.not.containEql("[native code]");
  });

  it("should be true for primitives", function () {
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
      isPrimitive(v).should.equal(true);
    });
  });

  it("should be false for boxed primitives", function () {
    var boxedPrimitives = [
      new String("foo"),
      new Number(true),
      new Number(false),
      new Number(42),
      new Number(0),
      new Number(-0),
      new Number(NaN),
      new Number(Infinity),
      new Number(-Infinity)
    ];
    boxedPrimitives.forEach(function (v) {
      isPrimitive(v).should.equal(false);
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
      isPrimitive(v).should.equal(false);
    });
    function namedFunction () {}
  });

  if (typeof document !== "undefined") {
    it("should be false for an HTML element", function () {
      var el = document.getElementsByTagName("div");
      isPrimitive(el).should.equal(false);
    });
  }
});
