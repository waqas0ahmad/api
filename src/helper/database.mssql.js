const mssql = require("mssql");


const mssqlHelper = {};
const con = {
    server: process.env.MSSQL_SERVER,
    user: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    options: {
        database: process.env.MSSQL_DATABASE
    }
};

var config = {
    user: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.MSSQL_DATABASE,
    "dialect": process.env.MSSQL_DIALECT,
    "dialectOptions": {
        "instanceName": process.env.MSSQL_INSTANCE
    }
};
mssqlHelper.runQuery = async function(query, data = {}) {
    // try {
        return new Promise((resolve, reject) => {
            mssql.connect(config, function(err) {
                if (err) {
                    require("./logger.helper").log(err);
                    reject("Connection error.");}
                else {
                    var request = new mssql.Request();
                    request.query(query, function(err, result) {
                        if (err) {
                            require("./logger.helper").log(err);
                            reject("Database error.");}
                        else {
                            resolve(
                                result.recordset);
                        }
                    });
                }
            });
        });
    // } catch (ex) {
    //     throw ex;
    // }
}
mssqlHelper.execSPInsert= async (SP,data=[])=>{
    await mssql.connect(config);
    return new Promise((resolve, reject) => {
        const request= new mssql.Request();
        for (let i = 0; i < data.length; i++) {      
            if(data[i].type)      
            request.input(data[i].name,data[i].type,data[i].value);
            else
            request.input(data[i].name,data[i].value);
        }
        request.execute(SP,(err,recordset,resturnView)=>{
            if(err) reject(err)
            else{
                resolve(recordset.rowsAffected[0]);
            }
        });
    });
}
mssqlHelper.execSPSelect= async (SP,data=[])=>{
    await mssql.connect(config);
    return new Promise((resolve, reject) => {
        const request= new mssql.Request();
        for (let i = 0; i < data.length; i++) {
            if(data[i].type)      
            request.input(data[i].name,data[i].type,data[i].value);
            else
            request.input(data[i].name,data[i].value);            
        }
        request.execute(SP,(err,recordset,resturnView)=>{
            if(err) {
                require("./logger.helper").log(err);
                reject(err);
            }
            else{
                resolve(recordset.recordset);
            }
        });
    });
}
module.exports = mssqlHelper;