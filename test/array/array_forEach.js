"use strict";
var sinon = require("sinon");

var testUtils = require("./test_utils");

describe("prototype.forEach", function () {
  var array_forEach,
      testSubject,
      expected,
      actual;

  before(function () {
    array_forEach = require("../../lib/array/array_forEach");
  });

  beforeEach(function () {
    testSubject = [2, 3, undefined, true, "hej", null, false, 0];
    delete testSubject[1];

    expected = {0: 2, 2: undefined, 3: true, 4: "hej", 5: null, 6: false, 7: 0 };
    actual = {};
  });

  it("should be a polyfill", function () {
    array_forEach.toString().should.not.containEql("[native code]");
  });

  it("should pass the right parameters", function () {
    var callback = sinon.spy(),
        array = ["1"];
    array_forEach.call(array, callback);

    callback.calledWith("1", 0, array).should.be.ok;
  });

  it("should not affect elements added to the array after it has begun", function () {
    var array = [1,2,3],
        i = 0;
    array_forEach.call(array, function (a) {
      i++;
      array.push(a + 3);
    });
    array.should.eql([1,2,3,4,5,6]);
    i.should.equal(3);
  });

  it("should iterate all", function () {
    array_forEach.call(testSubject, function (obj, index) {
      actual[index] = obj;
    });

    actual.should.eql(expected);
  });

  it("should iterate all using a context", function () {
    var o = { a: actual };

    array_forEach.call(testSubject, function (obj, index) {
      this.a[index] = obj;
    }, o);

    actual.should.eql(expected);
  });

  it("should iterate all in an array-like object", function () {
    var ts = testUtils.createArrayLikeFromArray(testSubject);
    array_forEach.call(ts, function (obj, index) {
      actual[index] = obj;
    });

    actual.should.eql(expected);
  });

  it("should iterate all in an array-like object using a context", function () {
    var ts = testUtils.createArrayLikeFromArray(testSubject),
        o = { a: actual };

    array_forEach.call(ts, function (obj, index) {
      this.a[index] = obj;
    }, o);

    actual.should.eql(expected);
  });

  describe("strings", function () {
    var str = "Hello, World!";

    beforeEach(function() {
      actual = [];
    });

    it("should iterate all in a string", function () {
      array_forEach.call(str, function (item, index) {
        actual[index] = item;
      });

      actual.should.eql(str.split(""));
    });

    it("should iterate all in a string using a context", function () {
      var o = { a: actual };
      array_forEach.call(str, function (item, index) {
        this.a[index] = item;
      }, o);

      actual.should.eql(str.split(""));
    });
  });

  describe("boxed", function () {
    beforeEach(function() {
      actual = null;
    });

    it("should have a boxed object as list argument of callback", function () {
      array_forEach.call("foo", function (item, index, list) {
        actual = list;
      });

      (typeof actual).should.equal("object");// don't use should.be.type here
      Object.prototype.toString.call(actual).should.equal("[object String]");
    });

    if (testUtils.hasStrictMode) {
      it("does not autobox the content in strict mode", function () {
        array_forEach.call([1], function () {
          "use strict";
          actual = this;
        }, "x");

        actual.should.be.type("string");
      });
    }
  });
});
