"use strict";

describe("holyfills", function() {
  before(function() {
    global.HAS_ARRAY_IS_ARRAY = false;
    global.HAS_FUNCTION_BIND = false;
    global.HAS_DESCRIPTORS_SUPPORT = false;
    global.IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_NOOP_EMPTY_ARRAY = false;
    global.IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_EMPTY_OBJECT = false;
    global.IS_ARRAY_SPLICE_WORKS_AS_EXPECTED = false;
    global.IS_ARRAY_UNSHIFT_WORKS_AS_EXPECTED = false;
    global.IS_ARRAY_FOREACH_WORKS_AS_EXPECTED = false,
    global.HAS_ARRAY_FOREACH = false;
    global.IS_ARRAY_MAP_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_MAP = false;
    global.IS_ARRAY_FILTER_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_FILTER = false;
    global.IS_ARRAY_EVERY_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_EVERY = false;
    global.IS_ARRAY_SOME_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_SOME = false;
  });
  require("./helpers");
  require("./array");
  require("./function");
  require("./object");
});
