"use strict";
var sinon = require("sinon");

var testUtils = require("./test_utils");

describe("prototype.filter", function () {
  var array_filter,
      testSubject,
      filteredArray,
      callback = function (o, i, array) {
        return i !== 3 && i !== 5;
      };

  before(function () {
    array_filter = require("../../lib/array/array_filter");
  });

  beforeEach(function () {
    testSubject = [2, 3, undefined, true, "hej", 3, null, false, 0];
    delete testSubject[1];
    filteredArray = [2, undefined, "hej", null, false, 0];
  });

  it("should be a polyfill", function () {
    array_filter.toString().should.not.containEql("[native code]");
  });

  it("should call the callback with the proper arguments", function () {
    var callback = sinon.spy(),
        array = ["1"];
    array_filter.call(array, callback);

    callback.calledWith("1", 0, array).should.be.ok;
  });

  it("should not affect elements added to the array after it has begun", function () {
    var array = [1,2,3],
        i = 0;
    array_filter.call(array, function (a) {
      i++;
      if (i <= 4) {
        array.push(a + 3);
      }
      return true;
    });

    array.should.eql([1,2,3,4,5,6]);
    i.should.equal(3);
  });

  it("should skip non-set values", function () {
    var passedValues = {};
    testSubject = [1,2,3,4];
    delete testSubject[1];
    array_filter.call(testSubject, function (o, i) {
      passedValues[i] = o;
      return true;
    });

    passedValues.should.eql(testSubject);
  });

  it("should pass the right context to the filter", function () {
    var passedValues = {};
    testSubject = [1,2,3,4];
    delete testSubject[1];
    array_filter.call(testSubject, function (o, i) {
      this[i] = o;
      return true;
    }, passedValues);

    passedValues.should.eql(testSubject);
  });

  it("should remove only the values for which the callback returns false", function () {
    var result = array_filter.call(testSubject, callback);

    result.should.eql(filteredArray);
  });

  it("should leave the original array untouched", function () {
    var copy = testSubject.slice();
    array_filter.call(testSubject, callback);

    testSubject.should.eql(copy);
  });

  it("should not be affected by same-index mutation", function () {
    var results = array_filter.call([1, 2, 3], function (value, index, array) {
      array[index] = "a";
      return true;
    });

    results.should.eql([1, 2, 3]);
  });

  describe("Array-like", function () {
    beforeEach(function () {
      testSubject = testUtils.createArrayLikeFromArray(testSubject);
    });

    it("should call the callback with the proper arguments", function () {
      var callback = sinon.spy(),
          array = testUtils.createArrayLikeFromArray(["1"]);
      array_filter.call(array, callback);

      callback.calledWith("1", 0, array).should.be.ok;
    });

    it("should not affect elements added to the array after it has begun", function () {
      var array = testUtils.createArrayLikeFromArray([1,2,3]),
          i = 0;
      array_filter.call(array, function (a) {
        i++;
        if (i <= 4) {
          array[i + 2] = a + 3;
        }
        return true;
      });
      delete array.length;

      array.should.eql([1,2,3,4,5,6]);
      i.should.equal(3);
    });

    it("should skip non-set values", function () {
      var passedValues = {};
      testSubject = testUtils.createArrayLikeFromArray([1,2,3,4]);
      delete testSubject[1];
      array_filter.call(testSubject, function (o, i) {
        passedValues[i] = o;
        return true;
      });
      delete testSubject.length;

      passedValues.should.eql(testSubject);
    });

    it("should pass the right context to the filter", function () {
      var passedValues = {};
      testSubject = testUtils.createArrayLikeFromArray([1,2,3,4]);
      delete testSubject[1];
      array_filter.call(testSubject, function (o, i) {
        this[i] = o;
        return true;
      }, passedValues);
      delete testSubject.length;

      passedValues.should.eql(testSubject);
    });

    it("should remove only the values for which the callback returns false", function () {
      var result = array_filter.call(testSubject, callback);

      result.should.eql(filteredArray);
    });

    it("should leave the original array untouched", function () {
      var copy = testUtils.createArrayLikeFromArray(testSubject);
      array_filter.call(testSubject, callback);

      testSubject.should.eql(copy);
    });
  });

  describe("boxed", function () {
    it("should have a boxed object as list argument of callback", function () {
      var actual;
      array_filter.call("foo", function (item, index, list) {
        actual = list;
      });

      (typeof actual).should.equal("object");// don't use should.be.type here
      Object.prototype.toString.call(actual).should.equal("[object String]");
    });
  });
});
