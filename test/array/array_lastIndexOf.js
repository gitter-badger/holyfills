"use strict";
var testUtils = require("./test_utils");

describe("prototype.lastIndexOf", function () {
  var array_lastIndexOf,
      testSubject,
      actual;

  before(function () {
    array_lastIndexOf = require("../../lib/array/array_lastIndexOf");
  });

  beforeEach(function () {
    testSubject = [2, 3, undefined, true, "hej", null, 2, false, 0];
    delete testSubject[1];
    delete testSubject[7];
  });

  it("should be a polyfill", function () {
    array_lastIndexOf.toString().should.not.containEql("[native code]");
  });

  it("should find the element", function () {
    actual = array_lastIndexOf.call(testSubject, "hej");

    actual.should.equal(4);
  });

  it("should not find the element", function () {
    actual = array_lastIndexOf.call(testSubject, "mus");

    actual.should.equal(-1);
  });

  it("should find undefined as well", function () {
    actual = array_lastIndexOf.call(testSubject, undefined);

    actual.should.not.equal(-1);
  });

  it("should skip unset indexes", function () {
    actual = array_lastIndexOf.call(testSubject, undefined);

    actual.should.equal(2);
  });

  it("should use a strict test", function () {
    actual = array_lastIndexOf.call(testSubject, null);
    actual.should.equal(5);

    actual = array_lastIndexOf.call(testSubject, "2");
    actual.should.equal(-1);
  });

  it("should skip the first if fromIndex is set", function () {
    actual = array_lastIndexOf.call(testSubject, 2, 2);
    actual.should.equal(0);

    actual = array_lastIndexOf.call(testSubject, 2, 0);
    actual.should.equal(0);

    actual = array_lastIndexOf.call(testSubject, 2, 6);
    actual.should.equal(6);
  });

  it("should work with negative fromIndex", function () {
    actual = array_lastIndexOf.call(testSubject, 2, -3);
    actual.should.equal(6);

    actual = array_lastIndexOf.call(testSubject, 2, -9);
    actual.should.equal(0);
  });

  it("should work with fromIndex being greater than the length", function () {
    actual = array_lastIndexOf.call(testSubject, 2, 20);
    actual.should.equal(6);
  });

  it("should work with fromIndex being negative and greater than the length", function () {
    actual = array_lastIndexOf.call(testSubject, 2, -20);
    actual.should.equal(-1);
  });

  describe("Array-like", function () {
    beforeEach(function () {
      testSubject = testUtils.createArrayLikeFromArray(testSubject);
    });

    it("should find the element", function () {
      actual = array_lastIndexOf.call(testSubject, "hej");

      actual.should.equal(4);
    });

    it("should not find the element", function () {
      actual = array_lastIndexOf.call(testSubject, "mus");

      actual.should.equal(-1);
    });

    it("should find undefined as well", function () {
      actual = array_lastIndexOf.call(testSubject, undefined);

      actual.should.not.equal(-1);
    });

    it("should skip unset indexes", function () {
      actual = array_lastIndexOf.call(testSubject, undefined);

      actual.should.equal(2);
    });

    it("should use a strict test", function () {
      actual = array_lastIndexOf.call(testSubject, null);
      actual.should.equal(5);

      actual = array_lastIndexOf.call(testSubject, "2");
      actual.should.equal(-1);
    });

    it("should skip the first if fromIndex is set", function () {
      actual = array_lastIndexOf.call(testSubject, 2, 2);
      actual.should.equal(0);

      actual = array_lastIndexOf.call(testSubject, 2, 0);
      actual.should.equal(0);

      actual = array_lastIndexOf.call(testSubject, 2, 6);
      actual.should.equal(6);
    });

    it("should work with negative fromIndex", function () {
      actual = array_lastIndexOf.call(testSubject, 2, -3);
      actual.should.equal(6);

      actual = array_lastIndexOf.call(testSubject, 2, -9);
      actual.should.equal(0);
    });

    it("should work with fromIndex being greater than the length", function () {
      actual = array_lastIndexOf.call(testSubject, 2, 20);
      actual.should.equal(6);
    });

    it("should work with fromIndex being negative and greater than the length", function () {
      actual = array_lastIndexOf.call(testSubject, 2, -20);
      actual.should.equal(-1);
    });
  });
});
