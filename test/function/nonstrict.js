describe("prototype.bind", function () {
  var function_bind, context;

  var testSubject = {
    push: function (o) {
      this.a.push(o);
    }
  };

  before(function () {
    function_bind = require("../../lib/function/function_bind");
  });

  it("binds properly without a context", function () {
    var context;
    testSubject.func = function_bind.call(function () {
      context = this;
    });
    testSubject.func();

    context.should.equal(function () { return this; }.call());
  });

  it("binds properly without a context, and still supplies bound arguments", function () {
    var a, context;
    testSubject.func = function_bind.call(function () {
      a = Array.prototype.slice.call(arguments);
      context = this;
    }, undefined, 1,2,3);
    testSubject.func(1,2,3);

    a.should.containDeep([1,2,3,1,2,3]).and.have.lengthOf(6);
    context.should.equal(function () { return this; }.call());
  });

  it("returns properly without binding a context", function () {
    testSubject.func = function_bind.call(function () {
      return this;
    });
    var context = testSubject.func();

    context.should.equal(function () { return this; }.call());
  });

  it("returns properly without binding a context, and still supplies bound arguments", function () {
    var context;
    testSubject.func = function_bind.call(function () {
      context = this;
      return Array.prototype.slice.call(arguments);
    }, undefined, 1,2,3);
    actual = testSubject.func(1,2,3);

    context.should.equal(function () { return this; }.call());
    actual.should.containDeep([1,2,3,1,2,3]).and.have.lengthOf(6);
  });
});
