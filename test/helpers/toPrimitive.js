"use strict";

describe("toPrimitive", function () {
  var toPrimitive;

  before(function () {
    toPrimitive = require("../../lib/helpers/toPrimitive");
  });

  it("should be a custom function", function () {
    toPrimitive.toString().should.not.containEql("[native code]");
  });

  it("should keep primitives", function () {
    var primitives = [
      "foo",
      true,
      false,
      42,
      0,
      -0,
      Infinity,
      -Infinity
    ];
    primitives.forEach(function (v) {
      toPrimitive(v).should.equal(v);
    });
    isNaN(toPrimitive(NaN)).should.equal(true);
  });

  it("should convert objects", function () {
    var objects = [
      {},
      [undefined, null, 1],
      /foo/,
      arguments,
      function () {},
      namedFunction
    ];

    objects.forEach(function (v) {
      toPrimitive.bind(null, v).should.not.throw();
    });
    function namedFunction () {}
  });

  if (typeof document !== "undefined") {
    it("should convert an HTML element", function () {
      var el = document.getElementsByTagName("div");
      toPrimitive.bind(null, el).should.not.throw();
    });
  }

  it("should fail for empty objects", function() {
    var object = {};
    object.valueOf = object.toString = undefined;

    toPrimitive.bind(null, Object.create(null)).should.throw();
    toPrimitive.bind(null, object).should.throw();
  });
});
