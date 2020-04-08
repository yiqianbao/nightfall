var ref = require("ref");
var ffi = require("ffi");
var Struct = require("ref-struct")
var ArrayType = require("ref-array")

//var longlong = ref.types.longlong;
//var LongArray = ArrayType(longlong);

// define object GoSlice to map to:
// C type struct { void *data; GoInt len; GoInt cap; }
/*var GoSlice = Struct({
  data: LongArray,
  len:  "longlong",
  cap: "longlong"
});*/

// define object GoString to map:
// C type struct { const char *p; GoInt n; }
var GoString = Struct({
  p: "string",
  n: "longlong"
});

// define foreign functions
var PedersenHashJs = ffi.Library("./pedersenHash.so", {
  PedersenHash: ["string", [GoString, GoString]]
});

exports.pedersenHashCallGo = pedersenHash;

function pedersenHash(msg) {

    let _msg = new Buffer.from(msg, "hex");

    let prefix = new GoString();
    prefix["p"] = "test";
    prefix["n"] = 4;


    let input = new GoString();
    input["p"] = _msg.toString("hex");
    input["n"] = 108;

    //console.log( input["p"]);

    let result = PedersenHashJs.PedersenHash(prefix, input);
    //console.log(result);
    let result_buf = new Buffer.from(result,"hex");
    //return result_buf.reverse();
    return result_buf;
}

/*str1 = new GoString();
str1["p"] = "test";
str1["n"] = 4;

str2 = new GoString();
str2["p"] = "abc";
str2["n"] = 3;

console.log("PedersenHash=", PedersenHashJs.PedersenHash(str1, str2));*/
