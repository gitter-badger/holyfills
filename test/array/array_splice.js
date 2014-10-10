"use strict";

describe("prototype.splice", function () {
  var array_splice,
      b = ["b"],
      a = [1, "a", b],
      test;

  before(function () {
    array_splice = require("../../lib/array/array_splice");
  });

  beforeEach(function () {
    test = a.slice(0);
  });

  it("should be a polyfill", function () {
    array_splice.toString().should.not.containEql("[native code]");
  });

  it("has the right length", function () {
    array_splice.should.have.lengthOf(2);
  });

  /* This test is disabled, because ES6 normalizes actual
   * browser behavior, contradicting ES5.
   */
  xit("treats undefined deleteCount as 0", function () {
    array_splice.call(test, 0).should.containDeep(array_splice.call(test, 0, 0)).and.should.have.lengthOf(0);
  });

  it("basic implementation test 1", function () {
    array_splice.call(test, 0, 0).should.be.empty;
  });

  it("basic implementation test 2", function () {
    array_splice.call(test, 0, 2);

    test.should.eql([b]);
  });

  it("should return right result 1", function () {
    var array = [];

    array_splice.call(array, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20);
    array_splice.call(array, 1, 0, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25", "F26");
    array_splice.call(array, 5, 0, "XXX");

    array.should.eql([1, "F1", "F2", "F3", "F4", "XXX", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25", "F26", 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it("should return right result 2", function () {
    var array = makeArray(6);

    array_splice.call(array, array.length - 1, 1, "");
    array_splice.call(array, 0, 1, 1, 2, 3, 4);
    array_splice.call(array, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45);

    array_splice.call(array, 4, 0, "99999999999999");

    array.should.eql([1, 2, 3, 4, "99999999999999", 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 1, 2, 3, 4, " 1", "  2", "   3", "    4", ""]);
  });

  it("should return right result 3", function () {
    var array = [1, 2, 3];

    array_splice.call(array, 0, array.length);
    array_splice.call(array, 0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    array_splice.call(array, 1, 1, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25", "F26");
    array_splice.call(array, 5, 1, "YYY", "XXX");
    array_splice.call(array, 0, 1);
    array_splice.call(array, 0, 2);
    array.pop();
    array.push.apply(array, makeArray(10, "-"));
    array_splice.call(array, array.length - 2, 10);
    array_splice.call(array);
    array_splice.call(array, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    array_splice.call(array, 1, 1, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25", "F26", 1, 23, 4, 5, 6, 7, 8);
    array_splice.call(array, 30, 10);
    array_splice.call(array, 30, 1);
    array_splice.call(array, 30, 0);
    array_splice.call(array, 2, 5, 1, 2, 3, "P", "LLL", "CCC", "YYY", "XXX");
    array.push(1, 2, 3, 4, 5, 6);
    array_splice.call(array, 1, 6, 1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9);
    array_splice.call(array, 3, 7);
    array.unshift(7, 8, 9, 10, 11);
    array.pop();
    array_splice.call(array, 5, 2);
    array.pop();
    array.unshift.apply(array, makeArray(8, "~"));
    array.pop();
    array_splice.call(array, 3, 1, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21","F22", "F23", "F24", "F25", "F26", 1, 23, 4, 5, 6, 7, 8);
    array_splice.call(array, 4, 5, "P", "LLL", "CCC", "YYY", "XXX");

    array.should.eql(["~0", "~ 1", "~  2", "F1", "P", "LLL", "CCC", "YYY", "XXX", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25", "F26", 1, 23, 4, 5, 6, 7, 8, "~    4", "~     5", "~      6", "~       7", 7, 8, 9, 10, 11, 2, 4, 5, 6, 7, 8, 9, "CCC", "YYY", "XXX", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25", "F26", 1, 23, 4, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, "YYY", "XXX", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25", "F26", 3, 4, 5, 6, 7, 8, 9, "-0", "- 1", "-  2", "-   3", "-    4", "-     5", "-      6", "-       7", 1, 2, 3]);
  });

  it("should do nothing if method called with no arguments", function () {
    // Safari 5.0 bug where .splice() returns undefined
    array_splice.call(test).should.eql([]);
    test.should.eql(a);
  });

  it("should set first argument to 0 if first argument is set but undefined", function () {
    var test2 = test.slice(0);

    array_splice.call(test, void 0, 2).should.eql(array_splice.call(test2, 0, 2));
    test.should.eql(test2);
  });

  it("should work with objects - adding 1", function () {
    var obj = {};

    array_splice.call(obj, 0, 0, 1, 2, 3);
    obj.should.have.lengthOf(3);
  });

  it("should work with objects - adding 2", function () {
    var obj = { 0: 1, length: 1 };

    array_splice.call(obj, 1, 0, 2, 3);
    obj.should.have.lengthOf(3);
  });

  it("should work with objects - removing", function () {
    var obj = { 0: 1, 1: 2, 2: 3, length: 3 };

    array_splice.call(obj, 0, 3);
    obj.should.have.lengthOf(0);
  });

  it("should work with objects - replacing", function () {
    var obj = { 0: 99, length: 1 };
    array_splice.call(obj, 0, 1, 1, 2, 3);

    obj.should.have.property('0', 1);
    obj.should.have.lengthOf(3);
  });

  function makeArray (l, prefix) {
    prefix = prefix || "";
    var a = [];
    while (l--) {
      a.unshift(prefix + Array(l + 1).join(" ") + l);
    }
    return a;
  }
});
