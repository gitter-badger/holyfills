"use strict";
var testUtils = require("./test_utils");

describe("prototype.indexOf", function () {
  var array_indexOf,
      testSubject,
      actual;

  before(function () {
    array_indexOf = require("../../lib/array/array_indexOf");
  });

  beforeEach(function () {
    testSubject = [2, 3, undefined, true, "hej", null, 2, false, 0];
    delete testSubject[1];
  });

  it("should be a polyfill", function () {
    array_indexOf.toString().should.not.containEql("[native code]");
  });

  it("should find the element", function () {
    actual = array_indexOf.call(testSubject, "hej");

    actual.should.equal(4);
  });

  it("should not find the element", function () {
    actual = array_indexOf.call(testSubject, "mus");

    actual.should.equal(-1);
  });

  it("should find undefined as well", function () {
    actual = array_indexOf.call(testSubject, undefined);

    actual.should.not.equal(-1);
  });

  it("should skip unset indexes", function () {
    actual = array_indexOf.call(testSubject, undefined);

    actual.should.equal(2);
  });

  it("should use a strict test", function () {
    actual = array_indexOf.call(testSubject, null);
    actual.should.equal(5);

    actual = array_indexOf.call(testSubject, "2");
    actual.should.equal(-1);
  });

  it("should skip the first if fromIndex is set", function () {
    actual = array_indexOf.call(testSubject, 2, 2);
    actual.should.equal(6);

    actual = array_indexOf.call(testSubject, 2, 0);
    actual.should.equal(0);

    actual = array_indexOf.call(testSubject, 2, 6);
    actual.should.equal(6);
  });

  it("should work with negative fromIndex", function () {
    actual = array_indexOf.call(testSubject, 2, -3);
    actual.should.equal(6);

    actual = array_indexOf.call(testSubject, 2, -9);
    actual.should.equal(0);
  });

  it("should work with fromIndex being greater than the length", function () {
    actual = array_indexOf.call(testSubject, 0, 20);
    actual.should.equal(-1);
  });

  it("should work with fromIndex being negative and greater than the length", function () {
    actual = array_indexOf.call(testSubject, "hej", -20);
    actual.should.equal(4);
  });

  describe("Array-like", function () {
    beforeEach(function () {
      testSubject = testUtils.createArrayLikeFromArray(testSubject);
    });

    it("should find the element", function () {
      actual = array_indexOf.call(testSubject, "hej");

      actual.should.equal(4);
    });

    it("should not find the element", function () {
      actual = array_indexOf.call(testSubject, "mus");

      actual.should.equal(-1);
    });

    it("should find undefined as well", function () {
      actual = array_indexOf.call(testSubject, undefined);

      actual.should.not.equal(-1);
    });

    it("should skip unset indexes", function () {
      actual = array_indexOf.call(testSubject, undefined);

      actual.should.equal(2);
    });

    it("should use a strict test", function () {
      actual = array_indexOf.call(testSubject, null);
      actual.should.equal(5);

      actual = array_indexOf.call(testSubject, "2");
      actual.should.equal(-1);
    });

    it("should skip the first if fromIndex is set", function () {
      actual = array_indexOf.call(testSubject, 2, 2);
      actual.should.equal(6);

      actual = array_indexOf.call(testSubject, 2, 0);
      actual.should.equal(0);

      actual = array_indexOf.call(testSubject, 2, 6);
      actual.should.equal(6);
    });

    it("should work with negative fromIndex", function () {
      actual = array_indexOf.call(testSubject, 2, -3);
      actual.should.equal(6);

      actual = array_indexOf.call(testSubject, 2, -9);
      actual.should.equal(0);
    });

    it("should work with fromIndex being greater than the length", function () {
      actual = array_indexOf.call(testSubject, 0, 20);
      actual.should.equal(-1);
    });

    it("should work with fromIndex being negative and greater than the length", function () {
      actual = array_indexOf.call(testSubject, "hej", -20);
      actual.should.equal(4);
    });
  });
});
