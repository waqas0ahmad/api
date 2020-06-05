const jwt = require('jsonwebtoken');
const config = require("../configs/jwt.config.json");
const jwtHelper = {};
jwtHelper.GetJwt = function(id,username,type) {
    const token = jwt.sign({id,username,type}, config.secrete, {
        expiresIn: 86400 //24hours,
    });
    return token;
}
jwtHelper.CheckToken = function(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secrete, function(err, decoded) {
            if (err) reject("UnAuthorized");
            else resolve(decoded);
        });
    });
}
jwtHelper.decodeToken=(token)=>{
return jwt.decode(token);
}
module.exports = jwtHelper;