"use strict";

describe("prototype.trim", function () {
  var string_trim,
      test = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFFHello, World!\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF",
      actual,
      expected = "\u200b";

  before(function() {
    string_trim = require("../../lib/string/string_trim");
  });

  it("should be a polyfill", function () {
    string_trim.toString().should.not.containEql("[native code]");
  });

  it("trims all ES5 whitespace", function () {
    actual = string_trim.call(test);

    actual.should.equal("Hello, World!").and.have.lengthOf(13);
  });

  it("does not trim the zero-width space", function () {
    actual = string_trim.call(expected);

    actual.should.equal(expected).and.have.lengthOf(1);
  });
});
