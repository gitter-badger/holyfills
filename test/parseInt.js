"use strict";

describe("parseInt", function () {
  var parseInt;

  before(function() {
    parseInt = require("../lib/parseInt");
  });

  it("should be a polyfill", function () {
    parseInt.toString().should.not.containEql("[native code]");
  });

  it("accepts a radix", function () {
    for (var i = 2; i <= 36; ++i) {
      parseInt("10", i).should.equal(i);
    }
  });

  it("defaults the radix to 10 when the number does not start with 0x or 0X", function () {
     [
       "01",
       "08",
       "10",
       "42"
     ].forEach(function (str) {
        parseInt(str).should.equal(parseInt(str, 10));
     });
  });

  it("defaults the radix to 16 when the number starts with 0x or 0X", function () {
    parseInt("0x16").should.equal(parseInt("0x16", 16));
    parseInt("0X16").should.equal(parseInt("0X16", 16));
  });

  it("ignores leading whitespace", function () {
    parseInt("  0x16").should.equal(parseInt("0x16", 16));
    parseInt("  42").should.equal(parseInt("42", 10));
    parseInt("  08").should.equal(parseInt("08", 10));

    var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
              "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
              "\u2029\uFEFF";
    parseInt(ws + "08").should.equal(parseInt("08", 10));
    parseInt(ws + "0x16").should.equal(parseInt("0x16", 16));
  });

   it("defaults the radix properly when not a true number", function () {
     var fakeZero = { valueOf: function () { return 0; } };
     parseInt("08", fakeZero).should.equal(parseInt("08", 10));
     parseInt("0x16", fakeZero).should.equal(parseInt("0x16", 16));
   });
});
