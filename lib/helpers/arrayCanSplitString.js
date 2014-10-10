// Check failure of by-index access of string characters (IE < 9)
// and failure of `0 in boxedString` (Rhino)
var boxedString = Object("a");
module.exports = boxedString[0] !== "a" || !(0 in boxedString);
