"use strict";

describe("toObject", function () {
  var toObject;

  before(function () {
    toObject = require("../../lib/helpers/toObject");
  });

  it("should be a custom function", function () {
    toObject.toString().should.not.containEql("[native code]");
  });

  it("should not convert null or undefined", function () {
    toObject.bind(null, null).should.throw();
    toObject.bind(null, undefined).should.throw();
  });

  it("should convert other values", function () {
    var objects = [
      "foo",
      true,
      false,
      42,
      0,
      -0,
      Infinity,
      -Infinity,
      NaN,
      {},
      Object.create(null),
      [undefined, null, 1],
      /foo/,
      arguments,
      function () {},
      namedFunction
    ];

    objects.forEach(function (v) {
      toObject.bind(null, v).should.not.throw();
    });
    function namedFunction () {}
  });

  if (typeof document !== "undefined") {
    it("should convert an HTML element", function () {
      var el = document.getElementsByTagName("div");
      toObject.bind(null, el).should.not.throw();
    });
  }
});
