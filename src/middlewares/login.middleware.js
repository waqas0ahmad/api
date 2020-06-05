const loginMiddleware = {};
const db = require("../helper/database.mssql");
const jwt = require("../helper/jwt.helper");
loginMiddleware.checkLogin = function(token) {
    return new Promise((resolve, reject) => {
        jwt.CheckToken(token).then(decoded => {
            db.runQuery("exec login '"+decoded.username+"'").then(result => {
                resolve("done");
            });
        }).catch(err => {
            reject(err);
        });
    });
}
module.exports = loginMiddleware;