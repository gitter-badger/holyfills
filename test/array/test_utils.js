exports.createArrayLikeFromArray = function (arr) {
  var o = {};
  Array.prototype.forEach.call(arr, function (e, i) {
    o[i] = e;
  });
  o.length = arr.length;
  return o;
};

exports.hasStrictMode = (function () {
  "use strict";
   return !this;
}());
