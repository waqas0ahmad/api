
const services = require("../services/index");
const jwt = require("../helper/jwt.helper");
const bcrypt = require("bcryptjs");
const accountRepository = {};
const logger=require("../helper/logger.helper");
accountRepository.login = function(data) {
    return new Promise((resolve, reject) => {
        services.account.login(data).then(result => {
            if (result.length > 0) {
                const password = result[0].Password;
                const verfied = bcrypt.compareSync(data.password, password);
                if (verfied) {
                    const token = jwt.GetJwt(result[0].Id, result[0].Username, result[0].UserTypeId);
                    result[0].Password=null;
                    result[0].token=token;
                    resolve(result[0]);
                } else {
                    reject("Username or password is not correct.");
                }
            } else {
                reject("Username or password is not valid.");
            }
        }).catch(err=>{
            logger.log(err);
            reject("Something went wrong");
        });
    });
}
accountRepository.updatePassword = (id, pass) => {
    return new Promise((resolve, reject) => {
        var hashedPassword = bcrypt.hashSync(pass, 8);
        services.account.updatePassword(id, hashedPassword).then(result => {
            const token = jwt.GetJwt(1);
            result[0].token = token;
            resolve(result[0]);
        }).catch(err=>{
            logger.log(err);
            reject("Something went wrong.");
        });
    });
}
accountRepository.getUser = (token, username) => {
    return new Promise((resolve, reject) => {
        jwt.CheckToken(token).then(decoded => {
            services.account.getUser(decoded.username, decoded.type).then(data => {
                resolve(data);
            }).catch(err => {
                logger.log(err);
                reject("Something went wrong");
            })
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
accountRepository.getAdmins=()=>{
    return new Promise((resolve,reject)=>{
        services.account.getAdmins().then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
accountRepository.getMechants=()=>{
    return new Promise((resolve,reject)=>{
        services.account.getMechants().then(data => {
            resolve(data);
        }).catch(err => {
            reject("Something went wrong");
        })
    });
}
accountRepository.getShopOwner=()=>{
    return new Promise((resolve,reject)=>{
        services.account.getShopOwner().then(data => {
            resolve(data);
        }).catch(err => {
            reject("Something went wrong");
        })
    });
}
accountRepository.getDeliverMen=()=>{
    return new Promise((resolve,reject)=>{
        services.account.getDeliverMen().then(data => {
            resolve(data);
        }).catch(err => {
            reject("Something went wrong");
        })
    });
}
accountRepository.addNewAdmin=(FirstName,LastName,Dob,Gender,Username,Password,filename)=>{
    return new Promise((resolve,reject)=>{
        services.account.checkUsername(Username).then(data=>{
            if(data.length>0){
                reject('Username already taken.');
            }else{

            services.account.addNewAdmin(FirstName,LastName,new Date(Dob).toFormat("MM/DD/YYYY"),Gender,Username,bcrypt.hashSync(Password,8),filename).then(data => {
                if(data[0].result==='Success')
                resolve('Admin account created successfully');
                else
                reject('Something went wrong try later.');
            }).catch(err => {
                reject("Something went wrong");
            })
        }
        }).catch(er=>{
            reject(er);
        })
        
    });
}
accountRepository.addNewShopowner=(FirstName,LastName,Bussiness_Name,Facebook_Name,Facebook_Page,Address,Postal_Code,State,City,Contact,Username,Password,filename)=>{
    return new Promise((resolve,reject)=>{
        services.account.checkUsername(Username).then(data=>{
            if(data.length>0){
                reject('Username already taken.');
            }else{
            bcrypt.hashSync(Password,8)
            services.account.addNewShopowner(FirstName,LastName,Bussiness_Name,Facebook_Name,Facebook_Page,Address,Postal_Code,State,City,Contact,Username,bcrypt.hashSync(Password,8),filename).then(data => {
                if(data[0].result==='Success')
                resolve('Shop owner account created successfully');
                else
                reject('Something went wrong try later.');
            }).catch(err => {
                reject("Something went wrong");
            })
        }
        }).catch(er=>{
            reject(er);
        })
        
    });
}

accountRepository.addNewMerchant=(FirstName,LastName,Address,Contact,Commision,Username,Password,filename)=>{
    return new Promise((resolve,reject)=>{
        services.account.checkUsername(Username).then(data=>{
            if(data.length>0){
                reject('Username already taken.');
            }else{
            bcrypt.hashSync(Password,8)
            services.account.addNewMerchant(FirstName,LastName,Address,Contact,Commision,Username,bcrypt.hashSync(Password,8),filename).then(data => {
                if(data[0].result==='Success')
                resolve('Merchant account created successfully');
                else
                reject('Something went wrong try later.');
            }).catch(err => {
                reject("Something went wrong");
            })
        }
        }).catch(er=>{
            reject(er);
        })
        
    });
}
accountRepository.addNewDeliveryMan=(FirstName,LastName,Address,Gender,JoiningDate,Contact,Model,PlateNumber,Series,Commission,Username,Password,filename)=>{
    return new Promise((resolve,reject)=>{
        services.account.checkUsername(Username).then(data=>{
            if(data.length>0){
                reject('Username already taken.');
            }else{
            bcrypt.hashSync(Password,8)
            services.account.addNewDeliveryMan(FirstName,LastName,Address,Gender,new Date(JoiningDate).toFormat("MM/DD/YYYY"),Contact,Model,PlateNumber,Series,Commission,Username,bcrypt.hashSync(Password,8),filename).then(data => {
                if(data[0].result==='Success')
                resolve('Delivery man account created successfully');
                else
                reject('Something went wrong try later.');
            }).catch(err => {
                reject("Something went wrong");
            })
        }
        }).catch(er=>{
            reject(er);
        })
        
    });
}
module.exports = accountRepository;