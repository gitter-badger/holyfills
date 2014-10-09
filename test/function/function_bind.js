"use strict";

describe("prototype.bind", function () {
  var function_bind, actual, expected;

  var testSubject = {
    push: function (o) {
      this.a.push(o);
    }
  };

  function func() {
    Array.prototype.forEach.call(arguments, function (a) {
      this.push(a);
    }, this);
    return this;
  }

  before(function() {
    function_bind = require("../../lib/function/function_bind");
  });

  beforeEach(function () {
    actual = [];
    testSubject.a = [];
  });

  it("binds a context properly", function () {
    testSubject.func = function_bind.call(func, actual);
    testSubject.func(1,2,3);

    actual.should.containDeep([1,2,3]).and.have.lengthOf(3);
    testSubject.a.should.have.lengthOf(0);
  });

  it("binds a context and supplies bound arguments", function () {
    testSubject.func = function_bind.call(func, actual, 1,2,3);
    testSubject.func(4,5,6);

    actual.should.containDeep([1,2,3,4,5,6]).and.have.lengthOf(6);
    testSubject.a.should.have.lengthOf(0);
  });

  it("returns properly while binding a context properly", function () {
    var ret;
    testSubject.func = function_bind.call(func, actual);
    ret = testSubject.func(1,2,3);

    ret.should.equal(actual);
    ret.should.not.equal(testSubject);
  });

  it("returns properly while binding a context and supplies bound arguments", function () {
    var ret;
    testSubject.func = function_bind.call(func, actual, 1,2,3);
    ret = testSubject.func(4,5,6);

    ret.should.equal(actual);
    ret.should.not.equal(testSubject);
  });

  it("has the new instance's context as a constructor", function () {
    var actualContext;
    var expectedContext = { foo: "bar" };
    testSubject.func = function_bind.call(function () {
      actualContext = this;
    }, expectedContext);
    var result = new testSubject.func();

    actualContext.should.not.equal(expectedContext);
  });

  it("passes the correct arguments as a constructor", function () {
    var ret, expected = { name: "Correct" };
    testSubject.func = function_bind.call(function (arg) {
      return arg;
    }, { name: "Incorrect" });
    ret = new testSubject.func(expected);

    ret.should.equal(expected);
  });

  it("returns the return value of the bound function when called as a constructor", function () {
    var oracle = [1, 2, 3];
    var Subject = function_bind.call(function () {
      return oracle;
    }, null);
    var result = new Subject();

    result.should.equal(oracle);
  });

  it("returns the correct value if constructor returns primitive", function () {
    var oracle = [1, 2, 3];
    var Subject = function_bind.call(function () {
      return oracle;
    }, null);
    var result = new Subject();
    result.should.equal(oracle);

    oracle = {};
    result = new Subject();
    result.should.equal(oracle);

    oracle = function () {};
    result = new Subject();
    result.should.equal(oracle);

    oracle = "asdf";
    result = new Subject();
    result.should.not.equal(oracle);

    oracle = null;
    result = new Subject();
    result.should.not.equal(oracle);

    oracle = true;
    result = new Subject();
    result.should.not.equal(oracle);

    oracle = 1;
    result = new Subject();
    result.should.not.equal(oracle);
  });

  it("returns the value that instance of original 'class' when called as a constructor", function () {
    var ClassA = function (x) {
      this.name = x || "A";
    };
    var ClassB = function_bind.call(ClassA, null, "B");

    var result = new ClassB();

    result.should.be.an.instanceOf(ClassA);
    result.should.be.an.instanceOf(ClassB);
  });

  it("sets a correct length without thisArg", function () {
    var Subject = function_bind.call(function (a, b, c) { return a + b + c; });

    Subject.should.have.lengthOf(3);
  });

  it("sets a correct length with thisArg", function () {
    var Subject = function_bind.call(function (a, b, c) { return a + b + c; }, {});

    Subject.should.have.lengthOf(3);
  });

  it("sets a correct length with thisArg and first argument", function () {
    var Subject = function_bind.call(function (a, b, c) { return a + b + c; }, {}, 1);

    Subject.should.have.lengthOf(2);
  });

  it("sets a correct length without thisArg and first argument", function () {
    var Subject = function_bind.call(function (a, b, c) { return a + b + c; }, undefined, 1);

    Subject.should.have.lengthOf(2);
  });

  it("sets a correct length without thisArg and too many argument", function () {
    var Subject = function_bind.call(function (a, b, c) { return a + b + c; }, undefined, 1, 2, 3, 4);

    Subject.should.have.lengthOf(0);
  });
});
