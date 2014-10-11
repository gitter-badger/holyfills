"use strict";

describe("prototype.split", function () {
  var string_split,
      test = "ab";

  before(function() {
    string_split = require("../../lib/string/string_split");
  });

  it("should be a polyfill", function () {
    string_split.toString().should.not.containEql("[native code]");
  });

  it("If 'separator' is undefined must return Array with one String - 'this' string", function () {
    string_split.call(test).should.eql([test]);
    string_split.call(test, void 0).should.eql([test]);
  });

  it("If 'separator is undefined and 'limit' set to 0 must return Array[]", function () {
    string_split.call(test, void 0, 0).should.eql([]);
  });

  describe("Tests from Steven Levithan", function () {
    it("''.split() results in ['']", function () {
      string_split.call("").should.eql([""]);
    });

    it("''.split(/./) results in ['']", function () {
      string_split.call("", /./).should.eql([""]);
    });

    it("''.split(/.?/) results in []", function () {
      string_split.call("", /.?/).should.eql([]);
    });

    it("''.split(/.??/) results in []", function () {
      string_split.call("", /.??/).should.eql([]);
    });

    it("'ab'.split(/a*/) results in ['', 'b']", function () {
      string_split.call("ab", /a*/).should.eql(["", "b"]);
    });

    it("'ab'.split(/a*?/) results in ['a', 'b']", function () {
      string_split.call("ab", /a*?/).should.eql(["a", "b"]);
    });

    it("'ab'.split(/(?:ab)/) results in ['', '']", function () {
      string_split.call("ab", /(?:ab)/).should.eql(["", ""]);
    });

    it("'ab'.split(/(?:ab)*/) results in ['', '']", function () {
      string_split.call("ab", /(?:ab)*/).should.eql(["", ""]);
    });

    it("'ab'.split(/(?:ab)*?/) results in ['a', 'b']", function () {
      string_split.call("ab", /(?:ab)*?/).should.eql(["a", "b"]);
    });

    it("'test'.split('') results in ['t', 'e', 's', 't']", function () {
      string_split.call("test", "").should.eql(["t", "e", "s", "t"]);
    });

    it("'test'.split() results in ['test']", function () {
      string_split.call("test").should.eql(["test"]);
    });

    it("'111'.split(1) results in ['', '', '', '']", function () {
      string_split.call("111", 1).should.eql(["", "", "", ""]);
    });

    it("'test'.split(/(?:)/, 2) results in ['t', 'e']", function () {
      string_split.call("test", /(?:)/, 2).should.eql(["t", "e"]);
    });

    it("'test'.split(/(?:)/, -1) results in ['t', 'e', 's', 't']", function () {
      string_split.call("test", /(?:)/, -1).should.eql(["t", "e", "s", "t"]);
    });

    it("'test'.split(/(?:)/, undefined) results in ['t', 'e', 's', 't']", function () {
      string_split.call("test", /(?:)/, undefined).should.eql(["t", "e", "s", "t"]);
    });

    it("'test'.split(/(?:)/, null) results in []", function () {
      string_split.call("test", /(?:)/, null).should.eql([]);
    });

    it("'test'.split(/(?:)/, NaN) results in []", function () {
      string_split.call("test", /(?:)/, NaN).should.eql([]);
    });

    it("'test'.split(/(?:)/, true) results in ['t']", function () {
      string_split.call("test", /(?:)/, true).should.eql(["t"]);
    });

    it("'test'.split(/(?:)/, '2') results in ['t', 'e']", function () {
      string_split.call("test", /(?:)/, "2").should.eql(["t", "e"]);
    });

    it("'test'.split(/(?:)/, 'two') results in []", function () {
      string_split.call("test", /(?:)/, "two").should.eql([]);
    });

    it("'a'.split(/-/) results in ['a']", function () {
      string_split.call("a", /-/).should.eql(["a"]);
    });

    it("'a'.split(/-?/) results in ['a']", function () {
      string_split.call("a", /-?/).should.eql(["a"]);
    });

    it("'a'.split(/-??/) results in ['a']", function () {
      string_split.call("a", /-??/).should.eql(["a"]);
    });

    it("'a'.split(/a/) results in ['', '']", function () {
      string_split.call("a", /a/).should.eql(["", ""]);
    });

    it("'a'.split(/a?/) results in ['', '']", function () {
      string_split.call("a", /a?/).should.eql(["", ""]);
    });

    it("'a'.split(/a??/) results in ['a']", function () {
      string_split.call("a", /a??/).should.eql(["a"]);
    });

    it("'ab'.split(/-/) results in ['ab']", function () {
      string_split.call("ab", /-/).should.eql(["ab"]);
    });

    it("'ab'.split(/-?/) results in ['a', 'b']", function () {
      string_split.call("ab", /-?/).should.eql(["a", "b"]);
    });

    it("'ab'.split(/-??/) results in ['a', 'b']", function () {
      string_split.call("ab", /-??/).should.eql(["a", "b"]);
    });

    it("'a-b'.split(/-/) results in ['a', 'b']", function () {
      string_split.call("a-b", /-/).should.eql(["a", "b"]);
    });

    it("'a-b'.split(/-?/) results in ['a', 'b']", function () {
      string_split.call("a-b", /-?/).should.eql(["a", "b"]);
    });

    it("'a-b'.split(/-??/) results in ['a', '-', 'b']", function () {
      string_split.call("a-b", /-??/).should.eql(["a", "-", "b"]);
    });

    it("'a--b'.split(/-/) results in ['a', '', 'b']", function () {
      string_split.call("a--b", /-/).should.eql(["a", "", "b"]);
    });

    it("'a--b'.split(/-?/) results in ['a', '', 'b']", function () {
      string_split.call("a--b", /-?/).should.eql(["a", "", "b"]);
    });

    it("'a--b'.split(/-??/) results in ['a', '-', '-', 'b']", function () {
      string_split.call("a--b", /-??/).should.eql(["a", "-", "-", "b"]);
    });

    it("''.split(/()()/) results in []", function () {
      string_split.call("", /()()/).should.eql([]);
    });

    it("'.'.split(/()()/) results in ['.']", function () {
      string_split.call(".", /()()/).should.eql(["."]);
    });

    it("'.'.split(/(.?)(.?)/) results in ['', '.', '', '']", function () {
      string_split.call(".", /(.?)(.?)/).should.eql(["", ".", "", ""]);
    });

    it("'.'.split(/(.??)(.??)/) results in ['.']", function () {
      string_split.call(".", /(.??)(.??)/).should.eql(["."]);
    });

    it("'.'.split(/(.)?(.)?/) results in ['', '.', undefined, '']", function () {
      string_split.call(".", /(.)?(.)?/).should.eql(["", ".", undefined, ""]);
    });

    it("'A<B>bold</B>and<CODE>coded</CODE>'.split(/<(\\/)?([^<>]+)>/) results in ['A', undefined, 'B', 'bold', '/', 'B', 'and', undefined, 'CODE', 'coded', '/', 'CODE', '']", function () {
      string_split.call("A<B>bold</B>and<CODE>coded</CODE>", /<(\/)?([^<>]+)>/).should.eql(["A", undefined, "B", "bold", "/", "B", "and", undefined, "CODE", "coded", "/", "CODE", ""]);
    });

    it("'tesst'.split(/(s)*/) results in ['t', undefined, 'e', 's', 't']", function () {
      string_split.call("tesst", /(s)*/).should.eql(["t", undefined, "e", "s", "t"]);
    });

    it("'tesst'.split(/(s)*?/) results in ['t', undefined, 'e', undefined, 's', undefined, 's', undefined, 't']", function () {
      string_split.call("tesst", /(s)*?/).should.eql(["t", undefined, "e", undefined, "s", undefined, "s", undefined, "t"]);
    });

    it("'tesst'.split(/(s*)/) results in ['t', '', 'e', 'ss', 't']", function () {
      string_split.call("tesst", /(s*)/).should.eql(["t", "", "e", "ss", "t"]);
    });

    it("'tesst'.split(/(s*?)/) results in ['t', '', 'e', '', 's', '', 's', '', 't']", function () {
      string_split.call("tesst", /(s*?)/).should.eql(["t", "", "e", "", "s", "", "s", "", "t"]);
    });

    it("'tesst'.split(/(?:s)*/) results in ['t', 'e', 't']", function () {
      string_split.call("tesst", /(?:s)*/).should.eql(["t", "e", "t"]);
    });

    it("'tesst'.split(/(?=s+)/) results in ['te', 's', 'st']", function () {
      string_split.call("tesst", /(?=s+)/).should.eql(["te", "s", "st"]);
    });

    it("'test'.split('t') results in ['', 'es', '']", function () {
      string_split.call("test", "t").should.eql(["", "es", ""]);
    });

    it("'test'.split('es') results in ['t', 't']", function () {
      string_split.call("test", "es").should.eql(["t", "t"]);
    });

    it("'test'.split(/t/) results in ['', 'es', '']", function () {
      string_split.call("test", /t/).should.eql(["", "es", ""]);
    });

    it("'test'.split(/es/) results in ['t', 't']", function () {
      string_split.call("test", /es/).should.eql(["t", "t"]);
    });

    it("'test'.split(/(t)/) results in ['', 't', 'es', 't', '']", function () {
      string_split.call("test", /(t)/).should.eql(["", "t", "es", "t", ""]);
    });

    it("'test'.split(/(es)/) results in ['t', 'es', 't']", function () {
      string_split.call("test", /(es)/).should.eql(["t", "es", "t"]);
    });

    it("'test'.split(/(t)(e)(s)(t)/) results in ['', 't', 'e', 's', 't', '']", function () {
      string_split.call("test", /(t)(e)(s)(t)/).should.eql(["", "t", "e", "s", "t", ""]);
    });

    it("'.'.split(/(((.((.??)))))/) results in ['', '.', '.', '.', '', '', '']", function () {
      string_split.call(".", /(((.((.??)))))/).should.eql(["", ".", ".", ".", "", "", ""]);
    });

    it("'.'.split(/(((((.??)))))/) results in ['.']", function () {
      string_split.call(".", /(((((.??)))))/).should.eql(["."]);
    });

    it("'a b c d'.split(/ /, -(Math.pow(2, 32) - 1)) results in ['a']", function () {
      string_split.call("a b c d", / /, -(Math.pow(2, 32) - 1)).should.eql(["a"]);
    });

    it("'a b c d'.split(/ /, Math.pow(2, 32) + 1) results in ['a']", function () {
      string_split.call("a b c d", / /, Math.pow(2, 32) + 1).should.eql(["a"]);
    });

    it("'a b c d'.split(/ /, Infinity) results in []", function () {
      string_split.call("a b c d", / /, Infinity).should.eql([]);
    });
  });
});
