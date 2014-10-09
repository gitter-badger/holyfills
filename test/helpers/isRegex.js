"use strict";

describe("isRegex", function () {
  var isRegex;

  before(function () {
    isRegex = require("../../lib/helpers/isRegex");
  });

  it("should be a custom function", function () {
    isRegex.toString().should.not.containEql("[native code]");
  });

  it("should be true for RegExp", function () {
    isRegex(/^should$/).should.equal(true);
    isRegex(new RegExp("^.+\s+S*$")).should.equal(true);
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
      isRegex(v).should.equal(false);
    });
  });

  it("should fail for other objects", function () {
    var objects = [
      {},
      [undefined, null, 1],
      arguments,
      function () {},
      namedFunction
    ];
    if (Object.create) {
      objects.push(Object.create(null));
    }

    objects.forEach(function (v) {
      isRegex(v).should.equal(false);
    });
    function namedFunction () {}
  });

  if (typeof document !== "undefined") {
    it("should be false for an HTML element", function () {
      var el = document.getElementsByTagName("div");
      isRegex(el).should.equal(false);
    });
  }
});
