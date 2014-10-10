"use strict";
var defineProperty = HAS_DESCRIPTORS_SUPPORT ? Object.defineProperty : function (object, name, descriptor) {
  object[name] = descriptor.value;
};

module.exports = function (object, name, method, forceAssign) {
  if (!forceAssign && (name in object)) { return; }
  defineProperty(object, name, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: method
  });
};
