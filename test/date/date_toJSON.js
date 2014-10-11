"use strict";

describe("prototype.toJSON", function () {
  var date_toJSON;

  before(function() {
    date_toJSON = require("../../lib/date/date_toJSON");
  });

  it("should be a polyfill", function () {
    date_toJSON.toString().should.not.containEql("[native code]");
  });

  it("should call toISOString", function () {
    // Opera 11.6x/12 bug
    var date = new Date(0);
    date.toISOString = function () {
      return 1;
    };

    date_toJSON.call(date).should.equal(1);
  });

  it("should return null for not finite dates", function () {
    var date = new Date(NaN),
        json;
    try {
      json = date_toJSON.call(date);
    } catch (e) {}

    (null === json).should.be.ok;
  });

  it("should return the isoString when stringified", function () {
    var date = new Date();

    JSON.stringify(date).should.equal(JSON.stringify(date.toISOString()));
  });
});
