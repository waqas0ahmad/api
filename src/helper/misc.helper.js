const crypto= require("crypto");
const miscHelper={};
miscHelper.makeid=(len) =>{
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();
 }
module.exports=miscHelper;