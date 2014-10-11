"use strict";

describe("prototype.toISOString", function () {
  var date_toISOString;

  before(function() {
    date_toISOString = require("../../lib/date/date_toISOString");
  });

  it("should be a polyfill", function () {
    date_toISOString.toString().should.not.containEql("[native code]");
  });

  it("should support extended years", function () {
    date_toISOString.call(new Date(-62198755200000)).should.startWith("-000001-01-01");
    date_toISOString.call(new Date(8.64e15)).should.startWith("+275760-09-13");
  });

  it("should return correct dates", function () {
    date_toISOString.call(new Date(-1)).should.equal("1969-12-31T23:59:59.999Z");// Safari 5.1.5 "1969-12-31T23:59:59.-01Z"
    date_toISOString.call(new Date(-3509827334573292)).should.equal("-109252-01-01T10:37:06.708Z"); // Opera 11.61/Opera 12 bug with Date#getUTCMonth
  });

  // TODO: write the rest of the test.
});
