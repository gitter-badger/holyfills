var testUtils = require("./test_utils");

["forEach", "map", "filter", "every", "some"].forEach(function (name) {
  describe("prototype." + name, function () {
    var subject, context;
    before(function () {
      subject = require("../../lib/array/array_" + name);
    });

    it("should set the right context when given none", function () {
      subject.call([1], function () { context = this; });

      context.should.equal(function () { return this; }.call());
    });

    describe("Array-like", function () {
      it("should set the right context when given none", function () {
        subject.call(testUtils.createArrayLikeFromArray([1]), function () {context = this;});

        context.should.eql(function () { return this; }.call());
      });
    });
  });
});
