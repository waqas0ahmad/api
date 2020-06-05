const loginMiddleware = {};
const db = require("../helper/database.mssql");
const jwt = require("../helper/jwt.helper");
const R = require("../helper/response.helper");
loginMiddleware.checkLogin = function(token) {
    return new Promise((resolve, reject) => {
        jwt.CheckToken(token).then(decoded => {
            db.runQuery("select * from [user]").then(result => {

            });
        }).catch(err => {
            reject(err);
        });
    });
}
loginMiddleware.Admin=(req,res,next)=>{
    const token = req.headers.authorization;
    jwt.CheckToken(token).then(decoded=>{
        db.runQuery("exec sp_login '"+decoded.username+"'").then(result=>{
            if(result[0].UserTypeId==1){
                next();
            }else{
                res.status(200).send(R.UnAuthorized("You do not have enough rights for this action."));
            }
        }).catch(er=>{
            res.status(200).send(R.UnAuthorized());
        });
    }).catch(er=>{
        res.status(200).send(R.UnAuthorized());
    });
}
loginMiddleware.login=(req,res,next)=>{
    const token = req.headers.authorization;
    jwt.CheckToken(token).then(decoded=>{
        db.runQuery("exec sp_login '"+decoded.username+"'").then(result=>{
            next();
            // if(result[0].UserTypeId==5){
            //     next();
            // }else{
            //     res.status(200).send(R.UnAuthorized("You do not have enough rights for this action."));
            // }
        }).catch(er=>{
            res.status(200).send(R.UnAuthorized());
        });
    }).catch(er=>{
        res.status(200).send(R.UnAuthorized());
    });
}
loginMiddleware.CRM=(req,res,next)=>{
    const token = req.headers.authorization;
    jwt.CheckToken(token).then(decoded=>{
        db.runQuery("exec sp_login '"+decoded.username+"'").then(result=>{
            if(result[0].UserTypeId==5){
                next();
            }else{
                res.status(200).send(R.UnAuthorized("You do not have enough rights for this action."));
            }
        }).catch(er=>{
            res.status(200).send(R.UnAuthorized());
        });
    }).catch(er=>{
        res.status(200).send(R.UnAuthorized());
    });
}
module.exports = loginMiddleware;