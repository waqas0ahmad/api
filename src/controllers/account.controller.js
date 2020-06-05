const R = require("../helper/response.helper");
const accountController = {};
const repos = require("../repositories/index");
accountController.login = function (req, res) {
    const { username, password } = req.body;

    if (!(username || password)) {
        res.status(200).send(R.Invalid("Provide username and password."));
    } else {
        repos.account.login({ username, password }).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail({}, err));
        });
    }
}
accountController.updatePassword = (req, res) => {
    repos.account.updatePassword(req.body.userid, req.body.password).then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
}
accountController.getUser = (req, res) => {
    if (req.headers.authorization) {
        repos.account.getUser(req.headers.authorization).then(data => {
            res.status(200).send(R.Success(data));
        }).catch(err => {
            res.status(200).send(R.Fail(err));
        });

    } else {
        res.status(200).send(R.UnAuthorized());
    }
}
accountController.getAdmins = (req, res) => {
repos.account.getAdmins().then(data => {
    res.status(200).send(R.Success(data));
}).catch(err => {
    res.status(200).send(R.Fail(err));
});
}

accountController.getCSA = (req, res) => {
    repos.account.getCSA().then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
    }

accountController.getMechants = (req, res) => {
    repos.account.getMechants().then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
}
accountController.getShopOwner = (req, res) => {
    repos.account.getShopOwner().then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
}
accountController.getDeliverMen = (req, res) => {
    repos.account.getDeliverMen().then(data => {
        res.status(200).send(R.Success(data));
    }).catch(err => {
        res.status(200).send(R.Fail(err));
    });
}
accountController.addNewAdmin=(req,res)=>{
    let {FirstName,LastName,Dob,Gender,Username,Password}=req.body;
    if(!(FirstName||LastName||Password||Username)){
        res.status(200).send(R.Invalid("Fill all required fields."));
    }else{
        if(!req.file){
            res.status(200).send(R.Invalid("Provide picture."));
        }else{
            if(!Dob) Dob='';
            if(!Gender) Gender='';
            repos.account.addNewAdmin(FirstName,LastName,Dob,Gender,Username,Password,'public/uploads/images/'+req.file.filename).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}
accountController.addNewCSA=(req,res)=>{
    let {FirstName,LastName,Dob,Gender,Username,Password}=req.body;
    if(!(FirstName||LastName||Password||Username)){
        res.status(200).send(R.Invalid("Fill all required fields."));
    }else{
        if(!req.file){
            res.status(200).send(R.Invalid("Provide picture."));
        }else{
            if(!Dob) Dob='';
            if(!Gender) Gender='';
            repos.account.addNewCSA(FirstName,LastName,Dob,Gender,Username,Password,'public/uploads/images/'+req.file.filename).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}
accountController.addNewMerchant=(req,res)=>{
    let {FirstName,LastName,Address,Contact,Commission,Username,Password}=req.body;
    if(!(FirstName||LastName||Address||Contact||Commission||Username||Password)){
        res.status(200).send(R.Invalid("Fill all required fields."));
    }else{
        if(!req.file){
            res.status(200).send(R.Invalid("Provide picture."));
        }else{
            repos.account.addNewMerchant(FirstName,LastName,Address,Contact,Commission,Username,Password,'public/uploads/images/'+req.file.filename).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}
accountController.addNewShopowner=(req,res)=>{
    let {FirstName,LastName,Bussiness_Name,Facebook_Name,Facebook_Page,Address,Postal_Code,State,City,Contact,Username,Password}=req.body;
    if(!(FirstName||LastName||Bussiness_Name||Facebook_Name||Facebook_Page||Address||Postal_Code||State||City||Contact||Username||Password)){
        res.status(200).send(R.Invalid("Fill all required fields."));
    }else{
        if(!req.file){
            res.status(200).send(R.Invalid("Provide picture."));
        }else{
            repos.account.addNewShopowner(FirstName,LastName,Bussiness_Name,Facebook_Name,Facebook_Page,Address,Postal_Code,State,City,Contact,Username,Password,'public/uploads/images/'+req.file.filename).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}
accountController.addNewDeliveryMan=(req,res)=>{
    let {FirstName,LastName,Address,Gender,JoiningDate,Contact,Model,PlateNumber,Series,Commission,Username,Password}=req.body;
    if(!(FirstName||LastName||Address||Gender||JoiningDate||Contact||Model||PlateNumber||Series||Commission||Username||Password)){
        res.status(200).send(R.Invalid("Fill all required fields."));
    }else{
        if(!req.file){
            res.status(200).send(R.Invalid("Provide picture."));
        }else{
            repos.account.addNewDeliveryMan(FirstName,LastName,Address,Gender,JoiningDate,Contact,Model,PlateNumber,Series,Commission,Username,Password,'public/uploads/images/'+req.file.filename).then(data => {
                res.status(200).send(R.Success(data));
            }).catch(err => {
                res.status(200).send(R.Fail(err));
            });
        }
    }
}
module.exports = accountController;