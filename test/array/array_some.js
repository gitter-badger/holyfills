"use strict";
var sinon = require("sinon");

var testUtils = require("./test_utils");

describe("prototype.some", function () {
  var array_some,
      testSubject,
      expected,
      actual,
      numberOfRuns;

  before(function () {
    array_some = require("../../lib/array/array_some");
  });

  beforeEach(function () {
    testSubject = [2, 3, undefined, true, "hej", null, false, 0];
    delete testSubject[1];

    expected = { 0: 2, 2: undefined, 3: true };
    actual = {};
    numberOfRuns = 0;
  });

  it("should be a polyfill", function () {
    array_some.toString().should.not.containEql("[native code]");
  });

  it("should pass the correct values along to the callback", function () {
    var callback = sinon.spy(),
        array = ["1"];
    array_some.call(array, callback);

    callback.calledWith("1", 0, array).should.be.ok;
  });

  it("should not affect elements added to the array after it has begun", function () {
    var array = [1,2,3],
        i = 0;
    array_some.call(array, function (a) {
      i++;
      array.push(a + 3);
      return i > 3;
    });

    array.should.eql([1,2,3,4,5,6]);
    i.should.equal(3);
  });

  it("should return true if it is stopped somewhere", function () {
    actual = array_some.call(testSubject, function () {});
    actual.should.not.be.ok;
  });

  it("should return true if it runs to the end", function () {
    actual = array_some.call(testSubject, function () { return true; });
    actual.should.be.ok;
  });

  it("should return false if there are no elements", function () {
    actual = array_some.call([], function () { return true; });
    actual.should.not.be.ok;
  });

  it("should stop after 3 elements", function () {
    array_some.call(testSubject, function (obj, index) {
      actual[index] = obj;
      numberOfRuns += 1;
      return numberOfRuns === 3;
    });

    actual.should.eql(expected);
  });

  it("should stop after 3 elements using a context", function () {
    var o = { a: actual };
    array_some.call(testSubject, function (obj, index) {
      this.a[index] = obj;
      numberOfRuns += 1;
      return numberOfRuns === 3;
    }, o);

    actual.should.eql(expected);
  });

  describe("Array-like", function () {
    beforeEach(function () {
      testSubject = testUtils.createArrayLikeFromArray(testSubject);
    });

    it("should stop after 3 elements", function () {
      array_some.call(testSubject, function (obj, index) {
        actual[index] = obj;
        numberOfRuns += 1;
        return numberOfRuns === 3;
      });

      actual.should.eql(expected);
    });

    it("should stop after 3 elements using a context", function () {
      var o = { a: actual };
      array_some.call(testSubject, function (obj, index) {
        this.a[index] = obj;
        numberOfRuns += 1;
        return numberOfRuns === 3;
      }, o);

      actual.should.eql(expected);
    });
  });

  describe("boxed", function () {
    beforeEach(function() {
      actual = null;
    });

    it("should have a boxed object as list argument of callback", function () {
      array_some.call("foo", function (item, index, list) {
        actual = list;
      });

      (typeof actual).should.equal("object");// don't use should.be.type here
      Object.prototype.toString.call(actual).should.equal("[object String]");
    });
  });
});
