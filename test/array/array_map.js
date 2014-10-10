"use strict";
var sinon = require("sinon");

var testUtils = require("./test_utils");

describe("prototype.map", function () {
  var array_map,
      testSubject,
      callback;

  before(function () {
    array_map = require("../../lib/array/array_map");
  });

  beforeEach(function () {
    var i = 0;
    callback = function () {
      return i++;
    };

    testSubject = [2, 3, undefined, true, "hej", null, false, 0];
    delete testSubject[1];
  });

  it("should be a polyfill", function () {
    array_map.toString().should.not.containEql("[native code]");
  });

  it("should call callback with the right parameters", function () {
    var callback = sinon.spy(),
        array = [1];
    array_map.call(array, callback);

    callback.calledWith(1, 0, array).should.be.ok;
  });

  it("should set the context correctly", function () {
    var context = {};
    array_map.call(testSubject, function (o,i) {
      this[i] = o;
    }, context);

    context.should.eql(testSubject);
  });

  it("should not change the array it is called on", function () {
    var copy = testSubject.slice();
    array_map.call(testSubject, callback);

    copy.should.eql(testSubject);
  });

  it("should only run for the number of objects in the array when it started", function () {
    var arr = [1,2,3],
        i = 0;
    array_map.call(arr, function (o) {
      arr.push(o + 3);
      i++;
      return o;
    });

    arr.should.eql([1, 2, 3, 4, 5, 6]);
    i.should.equal(3);
  });

  it("should properly translate the values as according to the callback", function () {
    var result = array_map.call(testSubject, callback),
        expected = [0, 0, 1, 2, 3, 4, 5, 6];
    delete expected[1];

    result.should.eql(expected);
  });

  it("should skip non-existing values", function () {
    var array = [1, 2, 3, 4],
        i = 0;
    delete array[2];
    array_map.call(array, function () {
      i++;
    });
    i.should.equal(3);
  });

  describe("Array-like", function () {
    beforeEach(function () {
      testSubject = testUtils.createArrayLikeFromArray(testSubject);
    });

    it("should call callback with the right parameters", function () {
      var callback = sinon.spy(),
          array = testUtils.createArrayLikeFromArray([1]);

      array_map.call(array, callback);
      callback.calledWith(1, 0, array).should.be.ok;
    });

    it("should set the context correctly", function () {
      var context = {};
      array_map.call(testSubject, function (o,i) {
        this[i] = o;
      }, context);
      delete testSubject.length;

      context.should.eql(testSubject);
    });

    it("should not change the array it is called on", function () {
      var copy = testUtils.createArrayLikeFromArray(testSubject);
      array_map.call(testSubject, callback);

      copy.should.eql(testSubject);
    });

    it("should only run for the number of objects in the array when it started", function () {
      var arr = testUtils.createArrayLikeFromArray([1, 2, 3]),
          i = 0;
      array_map.call(arr, function (o) {
        Array.prototype.push.call(arr, o + 3);
        i++;
        return o;
      });
      delete arr.length;

      arr.should.eql([1,2,3,4,5,6]);
      i.should.equal(3);
    });

    it("should properly translate the values as according to the callback", function () {
      var result = array_map.call(testSubject, callback),
          expected = [0,0,1,2,3,4,5,6];
      delete expected[1];

      result.should.eql(expected);
    });

    it("should skip non-existing values", function () {
      var array = testUtils.createArrayLikeFromArray([1,2,3,4]),
          i = 0;
      delete array[2];
      array_map.call(array, function () {
        i++;
      });

      i.should.equal(3);
    });
  });

  describe("boxed", function () {
    it("should have a boxed object as list argument of callback", function () {
      var actual;
      array_map.call("foo", function (item, index, list) {
        actual = list;
      });

      (typeof actual).should.equal("object");// don't use should.be.type here
      Object.prototype.toString.call(actual).should.equal("[object String]");
    });
  });
});
