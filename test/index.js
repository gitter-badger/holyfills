"use strict";

describe("holyfills", function() {
  before(function() {
    global.HAS_ARRAY_IS_ARRAY = false;
  });
  require("./helpers");
  require("./array");
});
