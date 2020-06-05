const services = require("../services/index");
const jwt = require("../helper/jwt.helper");
const bcrypt = require("bcryptjs");
const userRepository = {};
const logger=require("../helper/logger.helper");
userRepository.getUser = (token, username) => {
    return new Promise((resolve, reject) => {
        jwt.CheckToken(token).then(decoded => {
            services.user.getUser(decoded.username, decoded.type).then(data => {
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
userRepository.getAdmins = () => {
    return new Promise((resolve, reject) => {
        services.user.getAdmins().then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.getMechants = () => {
    return new Promise((resolve, reject) => {
        services.user.getMechants().then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.getShopOwner = () => {
    return new Promise((resolve, reject) => {
        services.user.getShopOwner().then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.getDeliverMen = () => {
    return new Promise((resolve, reject) => {
        services.user.getDeliverMen().then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.addNewAdmin = (FirstName, LastName, Dob, Gender, Username, Password, filename) => {
    return new Promise((resolve, reject) => {
        services.user.checkUsername(Username).then(data => {
            if (data.length > 0) {
                reject('Username already taken.');
            } else {

                services.user.addNewAdmin(FirstName, LastName, new Date(Dob).toFormat("MM/DD/YYYY"), Gender, Username, bcrypt.hashSync(Password, 8), filename).then(data => {
                    if (data[0].result === 'Success')
                        resolve('Admin account created successfully');
                    else
                        reject('Something went wrong try later.');
                }).catch(err => {
                    logger.log(err);
                    reject("Something went wrong");
                })
            }
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");;
        })

    });
}
userRepository.addNewShopowner = (FirstName, LastName, Bussiness_Name, Facebook_Name, Facebook_Page, Address, Postal_Code, State, City, Contact, Username, Password, filename) => {
    return new Promise((resolve, reject) => {
        services.user.checkUsername(Username).then(data => {
            if (data.length > 0) {
                reject('Username already taken.');
            } else {
                bcrypt.hashSync(Password, 8)
                services.user.addNewShopowner(FirstName, LastName, Bussiness_Name, Facebook_Name, Facebook_Page, Address, Postal_Code, State, City, Contact, Username, bcrypt.hashSync(Password, 8), filename).then(data => {
                    if (data[0].result === 'Success')
                        resolve('Shop owner account created successfully');
                    else
                        reject('Something went wrong try later.');
                }).catch(err => {
                    logger.log(err);
                    reject("Something went wrong");
                })
            }
        }).catch(err => {
            logger.log(err);
            reject("Somthing went wrong.");
        })

    });
}

userRepository.addNewMerchant = (FirstName, LastName, Address, Contact, Commision, Username, Password, filename) => {
    return new Promise((resolve, reject) => {
        services.user.checkUsername(Username).then(data => {
            if (data.length > 0) {
                reject('Username already taken.');
            } else {
                bcrypt.hashSync(Password, 8)
                services.user.addNewMerchant(FirstName, LastName, Address, Contact, Commision, Username, bcrypt.hashSync(Password, 8), filename).then(data => {
                    if (data[0].result === 'Success')
                        resolve('Merchant account created successfully');
                    else
                        reject('Something went wrong try later.');
                }).catch(err => {
                    logger.log(err);
                    reject("Something went wrong");
                })
            }
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong.");
        })

    });
}
userRepository.addNewDeliveryMan = (FirstName, LastName, Address, Gender, JoiningDate, Contact, Model, PlateNumber, Series, Commission, Username, Password, filename) => {
    return new Promise((resolve, reject) => {
        services.user.checkUsername(Username).then(data => {
            if (data.length > 0) {
                reject('Username already taken.');
            } else {
                bcrypt.hashSync(Password, 8)
                services.user.addNewDeliveryMan(FirstName, LastName, Address, Gender, new Date(JoiningDate).toFormat("MM/DD/YYYY"), Contact, Model, PlateNumber, Series, Commission, Username, bcrypt.hashSync(Password, 8), filename).then(data => {
                    if (data[0].result === 'Success')
                        resolve('Delivery man account created successfully');
                    else
                        reject('Something went wrong try later.');
                }).catch(err => {
                    logger.log(err);
                    reject("Something went wrong");
                })
            }
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong.");
        })

    });
}

userRepository.viewAdmin = (data) => {
    return new Promise((resolve, reject) => {
        services.user.viewAdmin(data).then(data => {
            resolve(data[0]);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.viewMerchant = (data) => {
    return new Promise((resolve,reject)=>{
        services.user.viewMerchant(data).then(data => {
            resolve(data[0]);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        });
    });
}
userRepository.viewShopowner = (data) => {
    return new Promise((resolve,reject)=>{
    services.user.viewShopowner(data).then(data => {
        resolve(data[0]);
    }).catch(err => {
        logger.log(err);
        reject("Something went wrong");
    })
})
}
userRepository.viewDeliveryman = (data) => {
    return new Promise((resolve,reject)=>{
    services.user.viewDeliveryman(data).then(data => {
        resolve(data[0]);
    }).catch(err => {
        logger.log(err);
        reject("Something went wrong");
    })
});
}

userRepository.editAdmin = (data) => { 
    return new Promise((resolve, reject) => {
       data.Dob=new Date(data.Dob).toFormat("MM/DD/YYYY")
        services.user.editAdmin(data).then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.editMerchant = (data) => { 
    return new Promise((resolve, reject) => {
        services.user.editMerchant(data).then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.editShopowner = (data) => { 
    return new Promise((resolve, reject) => {
        services.user.editShopowner(data).then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.editDeliveryman = (data) => { 
    return new Promise((resolve, reject) => {
        services.user.editDeliveryman(data).then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}

userRepository.deleteAdmin = (data) => { 
    return new Promise((resolve,reject)=>{
        services.user.deleteAdmin(data).then(data => {
            resolve(data[0]);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    })

}
userRepository.deleteMerchant = (data) => { 
    return new Promise((resolve,reject)=>{
        services.user.deleteMerchant(data).then(data => {
            resolve(data[0]);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    })
}
userRepository.deleteShopowner = (data) => { 
    return new Promise((resolve,reject)=>{
        services.user.deleteShopowner(data).then(data => {
            resolve(data[0]);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    })
}
userRepository.deleteDeliveryman = (data) => { 
    return new Promise((resolve,reject)=>{
        services.user.deleteDeliveryman(data).then(data => {
            resolve(data[0]);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    })
}

userRepository.getCSA=()=>{
    return new Promise((resolve,reject)=>{
        services.user.getCSA().then(data => {
            resolve(data);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    })
}
userRepository.addNewCSA=(data)=>{
    return new Promise((resolve,reject)=>{
        data.Dob=new Date(data.Dob);
        services.user.addNewCSA(data).then(data => {
            if(data>0){
            resolve("Custom service agent account created successfuly.");
            }else{
                resolve("Custom service agent account could not be created.");
            }
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    })
}
userRepository.editCSA=(data)=>{
    return new Promise((resolve,reject)=>{
        services.user.editCSA(data).then(data => {
            resolve(data[0]);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.viewCSA=(data)=>{
    return new Promise((resolve,reject)=>{
        services.user.viewCSA(data).then(data => {
            resolve(data[0]);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong");
        })
    });
}
userRepository.deleteCSA=(data)=>{
    return new Promise((resolve,reject)=>{
    services.user.deleteCSA(data).then(data => {
        resolve(data[0]);
    }).catch(err => {
        logger.log(err);
        reject("Something went wrong");
    })
})
}
module.exports = userRepository;