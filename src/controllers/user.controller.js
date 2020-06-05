const R = require("../helper/response.helper");
const userController = {};
const repos = require("../repositories/index");

userController.getUser = (req, res) => {
    if (req.headers.authorization) {
        repos.user.getUser(req.headers.authorization).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });

    } else {
        res.status(200).send(R.UnAuthorized());
    }
}
userController.getAdmins = (req, res) => {
    repos.user.getAdmins().then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
}

userController.getCSA = (req, res) => {
    repos.user.getCSA().then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
    }

userController.getMechants = (req, res) => {
    repos.user.getMechants().then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
}
userController.getShopOwner = (req, res) => {
    repos.user.getShopOwner().then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
}
userController.getDeliverMen = (req, res) => {
    repos.user.getDeliverMen().then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
}
userController.addNewAdmin = (req, res) => {
    let { Firstname, Lastname, Dob, Gender, Username, Password } = req.body;
    if (!(Firstname || Lastname || Password || Username)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        if (!req.file) {
            res.status(200).send(R.Invalid("Provide picture."));
        } else {
            if (!Dob) Dob = '';
            if (!Gender) Gender = '';
            repos.user.addNewAdmin(Firstname, Lastname, Dob, Gender, Username, Password, 'public/uploads/images/' + req.file.filename).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}


userController.addNewCSA = (req, res) => {
    let { Firstname, Lastname, Dob, Gender, Username, Password } = req.body;
    if (!(Firstname || Lastname || Password || Username)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        if (!req.file) {
            res.status(200).send(R.Invalid("Provide picture."));
        } else {
            if (!Dob) Dob = '';
            if (!Gender) Gender = '';
            repos.user.addNewCSA({FirstName:Firstname, LastName:Lastname, Dob, Gender, Username, Password, filename:'public/uploads/images/' + req.file.filename}).then(data => {
                res.status(200).send(R.Success({},data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}

userController.addNewMerchant = (req, res) => {
    let { FirstName, LastName, Address, Contact, Commission, Username, Password } = req.body;
    if (!(FirstName || LastName || Address || Contact || Commission || Username || Password)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        if (!req.file) {
            res.status(200).send(R.Invalid("Provide picture."));
        } else {
            repos.user.addNewMerchant(FirstName, LastName, Address, Contact, Commission, Username, Password, 'public/uploads/images/' + req.file.filename).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}
userController.addNewShopowner = (req, res) => {
    let { FirstName, LastName, Bussiness_Name, Facebook_Name, Facebook_Page, Address, Postal_Code, State, City, Contact, Username, Password } = req.body;
    if (!(FirstName || LastName || Bussiness_Name || Facebook_Name || Facebook_Page || Address || Postal_Code || State || City || Contact || Username || Password)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        if (!req.file) {
            res.status(200).send(R.Invalid("Provide picture."));
        } else {
            repos.user.addNewShopowner(FirstName, LastName, Bussiness_Name, Facebook_Name, Facebook_Page, Address, Postal_Code, State, City, Contact, Username, Password, 'public/uploads/images/' + req.file.filename).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}
userController.addNewDeliveryMan = (req, res) => {
    let { FirstName, LastName, Address, Gender, JoiningDate, Contact, Model, PlateNumber, Series, Commission, Username, Password } = req.body;
    if (!(FirstName || LastName || Address || Gender || JoiningDate || Contact || Model || PlateNumber || Series || Commission || Username || Password)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        if (!req.file) {
            res.status(200).send(R.Invalid("Provide picture."));
        } else {
            repos.user.addNewDeliveryMan(FirstName, LastName, Address, Gender, JoiningDate, Contact, Model, PlateNumber, Series, Commission, Username, Password, 'public/uploads/images/' + req.file.filename).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}

userController.viewAdmin = (req, res) => {
    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.viewAdmin({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }
}
userController.viewCSA = (req, res) => {
    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.viewCSA({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }
}
userController.viewMerchant = (req, res) => {
    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.viewMerchant({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }
}
userController.viewShopowner = (req, res) => {
    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.viewShopowner({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }

}
userController.viewDeliveryman = (req, res) => {
    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.viewDeliveryman({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }

}

userController.editAdmin = (req, res) => {
    let { Id, Firstname, Lastname, Dob, Gender } = req.body;
    if (!(Id || Firstname || Lastname)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        if (!Dob) Dob = '';
        if (!Gender) Gender = '';
        var _filename='';
        if(req.file){
            if(req.file.filename)
                _filename='public/uploads/images/' + req.file.filename;
        }
        repos.user.editAdmin({Id,FirstName:Firstname, LastName:Lastname, Dob, Gender, _filename}).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }
}

userController.editCSA = (req, res) => {
    let { Id, Firstname, Lastname, Dob, Gender } = req.body;
    if (!(Id || Firstname || Lastname)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        if (!Dob) Dob = '';
        if (!Gender) Gender = '';
        var _filename='';
        if(req.file){
            if(req.file.filename)
                _filename='public/uploads/images/' + req.file.filename;
        }
        repos.user.editCSA({Id,FirstName:Firstname, LastName:Lastname, Dob, Gender,IMAGE:_filename}).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }
}


userController.editMerchant = (req, res) => {
    let {Merchant_Id, FirstName, LastName, Address, Contact, Commission } = req.body;
    if (!(Merchant_Id||FirstName || LastName || Address || Contact || Commission)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        // if (!req.file) {
        //     res.status(200).send(R.Invalid("Provide picture."));
        // } else {
            let _filename='';
            if(req.file){
                if(req.file.filename)
                    _filename='public/uploads/images/' + req.file.filename;
            }
            repos.user.editMerchant({Id:Merchant_Id,FirstName, LastName, Address, Contact, Commission, _filename}).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        //}
    }
}
userController.editShopowner = (req, res) => {
    let {Shop_Owner_Id, FirstName, LastName, Bussiness_Name, Facebook_Name, Facebook_Page, Address, Postal_Code, State, City, Contact } = req.body;
    if (!(Shop_Owner_Id||FirstName || LastName || Bussiness_Name || Facebook_Name || Facebook_Page || Address || Postal_Code || State || City || Contact)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        // if (!req.file) {
        //     res.status(200).send(R.Invalid("Provide picture."));
        // } else {
            let _filename='';
            if(req.file){
                if(req.file.filename)
                    _filename='public/uploads/images/' + req.file.filename;
            }
            repos.user.editShopowner({Id:Shop_Owner_Id,FirstName, LastName, Bussiness_Name, Facebook_Name, Facebook_Page, Address, Postal_Code, State, City, Contact, _filename}).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    //}
}
userController.editDeliveryman = (req, res) => {
    let { Deliver_Man_Id,FirstName, LastName, Address, Gender, JoiningDate, Contact, Model, PlateNumber, Series, Commission } = req.body;
    if (!(Deliver_Man_Id||FirstName || LastName || Address || Gender || JoiningDate || Contact || Model || PlateNumber || Series || Commission)) {
        res.status(200).send(R.Invalid("Fill all required fields."));
    } else {
        // if (!req.file) {
        //     res.status(200).send(R.Invalid("Provide picture."));
        // } else {
            let _filename='';
            if(req.file){
                if(req.file.filename)
                    _filename='public/uploads/images/' + req.file.filename;
            }
            repos.user.editDeliveryman({Id:Deliver_Man_Id,FirstName, LastName, Address, Gender, JoiningDate, Contact, Model, PlateNumber, Series, Commission, _filename}).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail({},err));
            });
        //}
    }
}

userController.deleteAdmin = (req, res) => {
    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.deleteAdmin({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }

}

userController.deleteCSA = (req, res) => {
    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.deleteCSA({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }

}

userController.deleteMerchant = (req, res) => {

    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.deleteMerchant({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }
}
userController.deleteShopowner = (req, res) => {

    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.deleteShopowner({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }
}
userController.deleteDeliveryman = (req, res) => {
    let id = req.body.Id;
    if (!id || id + "" === "0") {
        res.status(200).send(R.Invalid("Select a member please."));
    } else {
        repos.user.deleteDeliveryman({ id }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });
    }
}

module.exports = userController;