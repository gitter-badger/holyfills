"use strict";

describe("parse", function () {
  before(function() {
    require("../../lib/date/date_constructor");
  });

  it("should be a polyfill", function () {
    Date.parse.toString().should.not.containEql("[native code]");
  });

  // TODO: Write the rest of the test.

  it("should support extended years", function () {
    Date.parse("0001-01-01T00:00:00Z").should.equal(-62135596800000);
    Date.parse("+275760-09-13T00:00:00.000Z").should.equal(8.64e15);
    Date.parse("+033658-09-27T01:46:40.000Z").should.equal(1e15);
    Date.parse("-000001-01-01T00:00:00Z").should.equal(-62198755200000);
    Date.parse("+002009-12-15T00:00:00Z").should.equal(1260835200000);
  });

  it("should be an invalid date", function () {                           //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
    Date.parse("2012-11-31T23:59:59.000Z").should.not.be.ok;              //1354406399000 NaN           NaN           1354406399000 NaN
    Date.parse("2012-12-31T23:59:60.000Z").should.not.be.ok;              //NaN           NaN           NaN           NaN           1356998400000
    Date.parse("2012-04-04T24:00:00.500Z").should.not.be.ok;              //NaN           NaN           1333584000500 1333584000500 NaN
    Date.parse("2012-12-31T10:08:60.000Z").should.not.be.ok;              //NaN           NaN           NaN           NaN           1356948540000
    Date.parse("2012-13-01T12:00:00.000Z").should.not.be.ok;              //NaN           NaN           NaN           NaN           NaN
    Date.parse("2012-12-32T12:00:00.000Z").should.not.be.ok;              //NaN           NaN           NaN           NaN           NaN
    Date.parse("2012-12-31T25:00:00.000Z").should.not.be.ok;              //NaN           NaN           NaN           NaN           NaN
    Date.parse("2012-12-31T24:01:00.000Z").should.not.be.ok;              //NaN           NaN           NaN           1356998460000 NaN
    Date.parse("2012-12-31T12:60:00.000Z").should.not.be.ok;              //NaN           NaN           NaN           NaN           NaN
    Date.parse("2012-12-31T12:00:60.000Z").should.not.be.ok;              //NaN           NaN           NaN           NaN           1356955260000
    Date.parse("2012-00-31T23:59:59.000Z").should.not.be.ok;              //NaN           NaN           NaN           NaN           NaN
    Date.parse("2012-12-00T23:59:59.000Z").should.not.be.ok;              //NaN           NaN           NaN           NaN           NaN
    Date.parse("2011-02-29T12:00:00.000Z").should.not.be.ok;              //1298980800000 NaN           NaN           1298980800000 NaN
  });

  it("should work", function () {                                         //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
    Date.parse("2012-12-31T23:59:59.000Z").should.equal(1356998399000);   //1356998399000 1356998399000 1356998399000 1356998399000 1356998399000
    Date.parse("2012-04-04T05:02:02.170Z").should.equal(1333515722170);   //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
    Date.parse("2012-04-04T05:02:02.170999Z").should.equal(1333515722170);//1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
    Date.parse("2012-04-04T05:02:02.17Z").should.equal(1333515722170);    //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
    Date.parse("2012-04-04T05:02:02.1Z").should.equal(1333515722100);     //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
    Date.parse("2012-04-04T24:00:00.000Z").should.equal(1333584000000);   //NaN           1333584000000 1333584000000 1333584000000 1333584000000
    Date.parse("2012-02-29T12:00:00.000Z").should.equal(1330516800000);   //1330516800000 1330516800000 1330516800000 1330516800000 1330516800000
    Date.parse("2011-03-01T12:00:00.000Z").should.equal(1298980800000);   //1298980800000 1298980800000 1298980800000 1298980800000 1298980800000

    // https://github.com/es-shims/es5-shim/issues/80 Safari bug with leap day
    (Date.parse("2034-03-01T00:00:00.000Z") -
          Date.parse("2034-02-27T23:59:59.999Z")).should.equal(86400001); //86400001      86400001       86400001       86400001      1

  });

  it("should support extended years", function () {                       //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
    Date.parse("0000-01-01T00:00:00.000Z").should.equal(-621672192e5);    //-621672192e5  -621672192e5  -621672192e5  -621672192e5  -621672192e5
    Date.parse("+275760-09-13T00:00:00.000Z").should.equal(8.64e15);      //8.64e15       NaN           8.64e15       8.64e15       8.64e15
    Date.parse("-271821-04-20T00:00:00.000Z").should.equal(-8.64e15);     //-8.64e15      NaN           -8.64e15      -8.64e15      -8.6400000864e15
    Date.parse("+275760-09-13T00:00:00.001Z").should.not.be.ok;           //NaN           NaN           NaN           8.64e15 + 1   8.64e15 + 1
    Date.parse("-271821-04-19T23:59:59.999Z").should.not.be.ok;           //NaN           NaN           NaN           -8.64e15 - 1  -8.6400000864e15 - 1
  });

  it("works with timezone offsets", function () {                         //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
    Date.parse("2012-01-29T12:00:00.000+01:00").should.equal(132783480e4);//132783480e4 132783480e4  132783480e4  132783480e4     132783480e4
    Date.parse("2012-01-29T12:00:00.000-00:00").should.equal(132783840e4);//132783840e4 132783840e4  132783840e4  132783840e4     132783840e4
    Date.parse("2012-01-29T12:00:00.000+00:00").should.equal(132783840e4);//132783840e4 132783840e4  132783840e4  132783840e4     132783840e4
    Date.parse("2012-01-29T12:00:00.000+23:59").should.equal(132775206e4);//132775206e4 132775206e4  132775206e4  132775206e4     132775206e4
    Date.parse("2012-01-29T12:00:00.000-23:59").should.equal(132792474e4);//132792474e4 132792474e4  132792474e4  132792474e4     132792474e4
    Date.parse("2012-01-29T12:00:00.000+24:00").should.not.be.ok;         //NaN         1327752e6    NaN          1327752000000   1327752000000
    Date.parse("2012-01-29T12:00:00.000+24:01").should.not.be.ok;         //NaN         NaN          NaN          1327751940000   1327751940000
    Date.parse("2012-01-29T12:00:00.000+24:59").should.not.be.ok;         //NaN         NaN          NaN          1327748460000   1327748460000
    Date.parse("2012-01-29T12:00:00.000+25:00").should.not.be.ok;         //NaN         NaN          NaN          NaN             NaN
    Date.parse("2012-01-29T12:00:00.000+00:60").should.not.be.ok;         //NaN         NaN          NaN          NaN             NaN
    Date.parse("-271821-04-20T00:00:00.000+00:01").should.not.be.ok;      //NaN         NaN          NaN          -864000000006e4 -864000008646e4
    Date.parse("-271821-04-20T00:01:00.000+00:01").should.equal(-8.64e15);//-8.64e15    NaN          -8.64e15     -8.64e15        -864000008640e4

    // When time zone is missed, local offset should be used (ES 5.1 bug)
    // see https://bugs.ecmascript.org/show_bug.cgi?id=112
    var tzOffset = Number(new Date(1970, 0));
    // same as (new Date().getTimezoneOffset() * 60000)
    Date.parse("1970-01-01T00:00:00").should.equal(tzOffset);             //tzOffset    0            0            0               NaN
  });

  it("should be able to coerce to a number", function () {
    var actual = Number(new Date(1970, 0));
    var expected = parseInt(actual, 10);

    actual.should.be.ok;
    actual.should.equal(expected);
    isNaN(actual).should.not.be.ok;
  });
});
