"use strict";

describe("keys", function () {
  var object_keys,
      actual;

  before(function() {
    object_keys = require("../../lib/object/keys");
  });

  it("should be a polyfill", function () {
    object_keys.toString().should.not.containEql("[native code]");
  });

  it("should throw error for non object", function () {
    (function () {
      Object.keys(42);
    }).should.throw();
  });

  describe("objects", function () {
    var obj = {
          str: "boz",
          obj: { },
          arr: [],
          bool: true,
          num: 42,
          "null": null,
          undefined: undefined
        },
        loopedValues = [],
        k;
    for (k in obj) { loopedValues.push(k); }

    beforeEach(function () {
      actual = object_keys.call(Object, obj);
    });

    it("should have correct length", function () {
      actual.should.have.lengthOf(7);
    });

    it("should return an Array", function () {
      Array.isArray(actual).should.be.ok;
    });

    it("should return names which are own properties", function () {
      actual.forEach(function (name) {
        obj.should.have.ownProperty(name);
      });
    });

    it("should return names which are enumerable", function () {
      actual.forEach(function (name) {
        loopedValues.should.containEql(name);
      })
    });
  });

  describe("arguments", function () {
    it("works with an arguments object", function () {
      (function () {
        actual = object_keys.call(Object, arguments);

        arguments.should.have.lengthOf(3);
        actual.should.eql(["0", "1", "2"]);
      }(1, 2, 3));
    });

    it("works with a legacy arguments object", function () {
      var FakeArguments = function (args) {
        args.forEach(function (arg, i) {
          this[i] = arg;
        }, this);
      };
      FakeArguments.prototype.length = 3;
      FakeArguments.prototype.callee = function () {};

      actual = object_keys.call(Object, new FakeArguments(["a", "b", "c"]));

      actual.should.eql(["0", "1", "2"]);
    });
  });

  describe("enumerating over non-enumerable properties", function () {
     it("has no enumerable keys on a Function", function () {
       function Foo () {}
       object_keys.call(Object, Foo.prototype).should.eql([]);
     });

     it("has no enumerable keys on a boolean", function () {
       object_keys.call(Object, Boolean.prototype).should.eql([]);
     });

     it("has no enumerable keys on an object", function () {
       object_keys.call(Object, Object.prototype).should.eql([]);
     });
  });

  describe("boxed", function () {
    it("works with boxed primitives", function () {
      object_keys.call(Object, new String("hello")).should.eql(["0", "1", "2", "3", "4"]);
      object_keys.call(Object, Object("hello")).should.eql(["0", "1", "2", "3", "4"]);
    });

    // BUG: https://github.com/es-shims/es5-shim/issues/242
    // TODO: fixme
    xit("works with boxed primitives with extra properties", function () {
      var x = new String("x");
      x.y = 1;
      actual = object_keys.call(Object, x);

      actual.should.containEql(["0", "y"]);
    });
  });
});
