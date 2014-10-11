"use strict";

describe("prototype.toFixed", function () {
  var toFixed;

  before(function() {
    toFixed = require("../../lib/number/number_toFixed");
  });

  it("should be a polyfill", function () {
    toFixed.toString().should.not.containEql("[native code]");
  });

  it('should convert numbers correctly', function () {
    toFixed.call(0.00008, 3).should.eql('0.000');
    toFixed.call(0.9, 0).should.eql('1');
    toFixed.call(1.255, 2).should.eql('1.25');
    toFixed.call(1843654265.0774949, 5).should.eql('1843654265.07749');
    toFixed.call(1000000000000000128, 0).should.eql('1000000000000000128');
  });
});
