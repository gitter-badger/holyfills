"use strict";

describe("prototype.unshift", function () {
  var array_unshift;

  before(function () {
    array_unshift = require("../../lib/array/array_unshift");
  });

  it("should be a polyfill", function () {
    array_unshift.toString().should.not.containEql("[native code]");
  });

  it("should return length", function () {
    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
    array_unshift.call([], 0).should.eql(1);
  });
});
