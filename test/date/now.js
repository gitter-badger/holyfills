"use strict";

describe("now", function () {
  var now;

  before(function() {
    now = require("../../lib/date/now");
  });

  it("should be a polyfill", function () {
    now.toString().should.not.containEql("[native code]");
  });

  it("should be the current time", function (done) {
    var before = (new Date()).getTime();

    // waste some time?
    setTimeout(function() {
      var middle = Date.now();

      setTimeout(function() {
        var after = (new Date()).getTime();

        middle.should.be.above(before).and.be.below(after);
        done();
      }, 10);
    }, 10);
  });
});
