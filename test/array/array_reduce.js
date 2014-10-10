"use strict";
var sinon = require("sinon");

var testUtils = require("./test_utils");

describe("prototype.reduce", function () {
  var array_reduce,
      testSubject;

  before(function () {
    array_reduce = require("../../lib/array/array_reduce");
  });

  beforeEach(function () {
    testSubject = [1,2,3];
  });

  it("should be a polyfill", function () {
    array_reduce.toString().should.not.containEql("[native code]");
  });

  it("should pass the correct arguments to the callback", function () {
    var callback = sinon.spy();
    array_reduce.call(testSubject, callback);

    callback.calledWith(1, 2, 1, testSubject).should.be.ok;
  });

  it("should start with the right initialValue", function () {
    var callback = sinon.spy(0);
    array_reduce.call(testSubject, callback, 0);

    callback.calledWith(0, 1, 0, testSubject).should.be.ok;
  });

  it("should not affect elements added to the array after it has begun", function () {
    var array = [1,2,3],
        i = 0;
    array_reduce.call(array, function (a, b) {
      i++;
      if (i <= 4) {
        array.push(a + 3);
      }
      return b;
    });

    array.should.eql([1, 2, 3, 4, 5]);
    i.should.equal(2);
  });

  it("should work as expected for empty arrays", function () {
    var callback = sinon.spy();

    (function () {
      array_reduce.call(callback);
    }).should.throw();

    callback.called.should.not.be.ok;
  });

  it("should throw correctly if no callback is given", function () {
    (function () {
      array_reduce.call();
    }).should.throw();
  });

  it("should return the expected result", function () {
    array_reduce.call(testSubject, function (a, b) {
      return String(a || "") + String(b || "");
    }).should.eql(testSubject.join(""));
  });

  it("should not directly affect the passed array", function () {
    var copy = testSubject.slice();
    array_reduce.call(testSubject, function (a, b) {
      return a + b;
    });

    testSubject.should.eql(copy);
  });

  it("should skip non-set values", function () {
    delete testSubject[1];
    var visited = {};
    array_reduce.call(testSubject, function (a, b) {
      if (a) { visited[a] = true; }
      if (b) { visited[b] = true; }
      return 0;
    });

    visited.should.eql({ 1: true, 3: true });
  });

  it("should have the right length", function () {
    array_reduce.should.have.lengthOf(1);
  });

  describe("Array-like", function () {
    beforeEach(function () {
      testSubject = testUtils.createArrayLikeFromArray(testSubject);
    });

    it("should pass the correct arguments to the callback", function () {
      var callback = sinon.spy(0);
      array_reduce.call(testSubject, callback);

      callback.calledWith(1, 2, 1, testSubject).should.be.ok;
    });

    it("should start with the right initialValue", function () {
      var callback = sinon.spy(0);
      array_reduce.call(testSubject, callback, 0);

      callback.calledWith(0, 1, 0, testSubject).should.be.ok;
    });

    it("should not affect elements added to the array after it has begun", function () {
      var array = testUtils.createArrayLikeFromArray([1,2,3]),
          i = 0;
      array_reduce.call(array, function (a, b) {
        i++;
        if (i <= 4) {
          array[i + 2] = a + 3;
        }
        return b;
      });

      array.should.eql({
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        length: 3
      });
      i.should.equal(2);
    });

    it("should work as expected for empty arrays", function () {
      var callback = sinon.spy();

      (function () {
        array_reduce.call({length: 0}, callback);
      }).should.throw();
      callback.called.should.not.be.ok;
    });

    it("should throw correctly if no callback is given", function () {
      (function () {
        array_reduce.call();
      }).should.throw();
    });

    it("should return the expected result", function () {
      array_reduce.call(testSubject, function (a, b) {
        return String(a || "") + String(b || "");
      }).should.eql("123");
    });

    it("should not directly affect the passed array", function () {
      var copy = testUtils.createArrayLikeFromArray(testSubject);
      array_reduce.call(testSubject, function (a, b) {
        return a + b;
      });

      testSubject.should.eql(copy);
    });

    it("should skip non-set values", function () {
      delete testSubject[1];
      var visited = {};
      array_reduce.call(testSubject, function (a, b) {
        if (a) { visited[a] = true; }
        if (b) { visited[b] = true; }
        return 0;
      });

      visited.should.eql({ 1: true, 3: true });
    });
  });

  describe("boxed", function () {
    it("should have a boxed object as list argument of callback", function () {
      var actual;
      array_reduce.call("foo", function (accumulator, item, index, list) {
        actual = list;
      });

      (typeof actual).should.equal("object");// don't use should.be.type here
      Object.prototype.toString.call(actual).should.equal("[object String]");
    });
  });
});
