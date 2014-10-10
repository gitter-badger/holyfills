"use strict";

describe("holyfills", function() {
  before(function() {
    global.HAS_ARRAY_IS_ARRAY = false;
    global.HAS_FUNCTION_BIND = false;
    global.HAS_DESCRIPTORS_SUPPORT = false;
  });
  require("./helpers");
  require("./array");
  require("./function");
  require("./object");
});
