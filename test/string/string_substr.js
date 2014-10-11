"use strict";

describe("prototype.substr", function () {
  var string_substr,
      expected = "0x0b",
      actual;

  before(function() {
    string_substr = require("../../lib/string/string_substr");
  });

  it("should be a polyfill", function () {
    string_substr.toString().should.not.containEql("[native code]");
  });

  it("returns correct result for negative index", function () {
    string_substr.call(expected, -3, 1).should.eql("x");
  });

  it("returns original string for negative index longer than length", function () {
    string_substr.call(expected, -100).should.eql(expected);
  });
});
