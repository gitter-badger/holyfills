"use strict";

describe("prototype.replace", function () {
  var string_replace;

  before(function() {
    string_replace = require("../../lib/string/string_replace");
  });

  it("should be a polyfill", function () {
    string_replace.toString().should.not.containEql("[native code]");
  });

  it("returns undefined for non-capturing groups", function () {
    var groups = [];
    string_replace.call("x", /x(.)?/g, function (m, group) {
      groups.push(group); /* "" in FF, `undefined` in CH/WK/IE */
    });

    groups.should.have.lengthOf(1);
    groups.should.have.property(0, undefined);
  });

  it("should not fail in Firefox", function () {
    (function () {
      string_replace.call("* alef\n* beth \n* gimel~0\n",
        /(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
        function (match, m1, m2, m3, m4) { return "<li>" + m4 + "</li>\n"; }
      );
    }).should.not.throw();
  });
});
