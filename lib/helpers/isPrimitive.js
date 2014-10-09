"use strict";

module.exports = function (input) {
  var type = typeof input;
  return (
    input === null ||
    type === "undefined" ||
    type === "boolean" ||
    type === "number" ||
    type === "string"
  );
};
