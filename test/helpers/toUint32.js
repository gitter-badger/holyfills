"use strict";

describe("toUint32", function () {
  var toUint32;

  before(function () {
    toUint32 = require("../../lib/helpers/toUint32");
  });

  it("should be a custom function", function () {
    toUint32.toString().should.not.containEql("[native code]");
  });

  it("should convert integers", function () {
    toUint32(1).should.equal(1);
    toUint32(+0).should.equal(0);
    toUint32(-0).should.equal(0);
    toUint32(-1).should.equal(Math.pow(2, 32)-1);
  });
});
