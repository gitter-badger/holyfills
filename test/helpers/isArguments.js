"use strict";

describe("isArguments", function () {
  var isArguments;

  before(function () {
    isArguments = require("../../lib/helpers/isArguments");
  });

  it("should be a custom function", function () {
    isArguments.toString().should.not.containEql("[native code]");
  });

  it("should be true for arguments", function () {
    isArguments(arguments).should.equal(true);
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
      isArguments(v).should.equal(false);
    });
  });

  it("should fail for other objects", function () {
    var objects = [
      {},
      [undefined, null, 1],
      /foo/,
      function () {},
      namedFunction
    ];
    if (Object.create) {
      objects.push(Object.create(null));
    }

    objects.forEach(function (v) {
      isArguments(v).should.equal(false);
    });
    function namedFunction () {}
  });

  if (typeof document !== "undefined") {
    it("should be false for an HTML element", function () {
      var el = document.getElementsByTagName("div");
      isArguments(el).should.equal(false);
    });
  }
});
