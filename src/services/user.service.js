const db = require("../helper/database.mssql");
const userService = {};

userService.getUser = (username, userTypeId) => {
    let query = "";
    if (userTypeId === 1) {
        query = "select * from [User] u join [admin] a on u.UserId=a.id and u.Username='" + username + "'";
    }
    if (userTypeId === 2) {
        query = "select * from [User] u join [Merchant] m on u.UserId=m.Merchant_Id and u.Username='" + username + "'";
    }
    if (userTypeId === 3) {
        query = "select * from [User] u join [Shop_Owner] so on u.UserId=so.Shop_Owner_Id and u.Username='" + username + "'";
    }
    if (userTypeId === 4) {
        query = "select * from [User] u join [Delivery_Man] dm on u.UserId=dm.Deliver_Man_Id and u.Username='" + username + "'";
    }
    const result = db.runQuery(query);
    return result;
}
userService.getAdmins = () => {
    const query = "select * from admin where    isnull(Deleted,0)=0";
    const result = db.runQuery(query);
    return result;
}
userService.getMechants = () => {
    const query = "select * from merchant  where    isnull(Deleted,0)=0";
    const result = db.runQuery(query);
    return result;
}
userService.getShopOwner = () => {
    const query = "select * from Shop_Owner  where    isnull(Deleted,0)=0";
    const result = db.runQuery(query);
    return result;
}
userService.getDeliverMen = () => {
    const query = "select * from Delivery_Man  where    isnull(Deleted,0)=0";
    const result = db.runQuery(query);
    return result;
}
userService.addNewAdmin = (FirstName, LastName, Dob, Gender, Username, Password, filename) => {
    const query = `exec sp_add_new_admin '${FirstName}','${LastName}','${Dob}','${Gender}','${Username}','${Password}','${filename}';`;
    const result = db.runQuery(query);
    return result;
}
userService.checkUsername = (Username) => {
    const query = `select * from [user] where username='${Username}'`;
    const result = db.runQuery(query);
    return result;
}
userService.addNewShopowner = (FirstName, LastName, Bussiness_Name, Facebook_Name, Facebook_Page, Address, Postal_Code, State, City, Contact, Username, Password, filename) => {
    const query = `exec sp_add_new_shopowner '${FirstName}','${LastName}','${Bussiness_Name}','${Facebook_Name}','${Facebook_Page}','${Address}','${Postal_Code}','${State}','${City}','${Contact}','${Username}','${Password}','${filename}';`;
    const result = db.runQuery(query);
    return result;
}

userService.addNewMerchant = (FirstName, LastName, Address, Contact, Commision, Username, Password, filename) => {
    const query = `exec INSERT_MERCHANT '${FirstName}','${LastName}','${Address}','${Contact}','${Commision}','${Username}','${Password}','${filename}';`;
    const result = db.runQuery(query);
    return result;
}
userService.addNewDeliveryMan = (FirstName, LastName, Address, Gender, JoiningDate, Contact, Model, PlateNumber, Series, Commission, Username, Password, filename) => {
    const query = `exec SP_ADD_NEW_DELIVERY_MAN '${FirstName}','${LastName}','${Address}','${Gender}','${JoiningDate}','${Contact}','${Model}','${PlateNumber}','${Series}','${Commission}','${Username}','${Password}','${filename}';`;
    const result = db.runQuery(query);
    return result;
}


userService.viewAdmin = (data) => {
    const query = `select * from admin  where id='${data.id}' and isnull(Deleted,0)=0`;
    const result = db.runQuery(query);
    return result;
}
userService.viewMerchant = (data) => {
    const query = `select * from merchant where merchant_id='${data.id}'  and isnull(Deleted,0)=0`;
    const result = db.runQuery(query);
    return result;
}
userService.viewShopowner = (data) => {
    const query = `select * from shop_owner where shop_owner_id= '${data.id}'  and isnull(Deleted,0)=0`;
    const result = db.runQuery(query);
    return result;
}
userService.viewDeliveryman = (data) => {
    const query = `select * from Delivery_Man where Deliver_Man_Id='${data.id}'  and isnull(Deleted,0)=0`;
    const result = db.runQuery(query);
    return result;
}


userService.editAdmin = (data) => {
    const SPParams = [
        {
            name: "ID",
            type: require("mssql").VarChar(11),
            value: data.Id
        },
        {
            name: "FirstName",
            type: require("mssql").VarChar(300),
            value: data.FirstName
        },
        {
            name: "LastName",
            type: require("mssql").VarChar(300),
            value: data.LastName
        },
        {
            name: "Dob",
            type: require("mssql").Date,
            value: data.Dob
        },
        {
            name: "Gender",
            type: require("mssql").VarChar(300),
            value: data.Gender
        },
        {
            name: "IMAGE",
            type: require("mssql").VarChar(300),
            value: data._filename
        }
    ];

    const result = db.execSPInsert("SP_EDIT_ADMIN", SPParams);
    return result;
}
userService.editMerchant = (data) => {
    const SPParams = [        
        {
            name: 'Id',
            type:require("mssql").Int,
            value: data.Id
        },
        {
            name: 'First_Name',
            type: require("mssql").VarChar(50),
            value: data.FirstName
        }, {
            name: 'Last_Name',
            type: require("mssql").VarChar(50),
            value: data.LastName
        },
        {
            name: 'Address',
            type: require("mssql").VarChar(200),
            value: data.Address
        },
        {
            name: 'Contact',
            type: require("mssql").VarChar(15),
            value: data.Contact
        },
        {
            name: 'Commission',
            type: require("mssql").Int,
            value: data.Commission
        },
        {
            name: 'Filename',
            type: require("mssql").VarChar(300),
            value: data._filename
        }
    ];
    const result = db.execSPInsert("SP_EDIT_MERCHANT", SPParams);
    return result;
}
userService.editShopowner = (data) => {

    
    const SPParams = [
        {
            name: 'Shop_Owner_Id',
            type: require("mssql").VarChar(50),
            value: data.Id
        },
        {
            name: 'First_Name',
            type: require("mssql").VarChar(50),
            value: data.FirstName
        },
        {
            name: 'Last_Name',
            type: require("mssql").VarChar(50),
            value: data.LastName
        },
        {
            name: 'Bussiness_Name',
            type: require("mssql").VarChar(50),
            value: data.Bussiness_Name
        }, {
            name: 'Facebook_Name',
            type: require("mssql").VarChar(50),
            value: data.Facebook_Name
        }, {
            name: 'Facebook_Page',
            type: require("mssql").VarChar(50),
            value: data.Facebook_Page
        }, {
            name: 'Address',
            type: require("mssql").VarChar(50),
            value: data.Address
        }, {
            name: 'Contact',
            type: require("mssql").VarChar(50),
            value: data.Contact
        }, {
            name: 'Logo',
            type: require("mssql").VarChar(50),
            value: data._filename
        }
    ]
 
    const result = db.execSPInsert("Update_Shop_Owner", SPParams);
    return result;
}
userService.editDeliveryman = (data) => {
   
        const SPParams = [{
            name: 'ID',
            type: require("mssql").Int,
            value:data.Id
        }, {
            name: 'FirstName',
            type: require("mssql").VarChar(300),
            value:data.FirstName
        }, {
            name: 'LastName',
            type: require("mssql").VarChar(300),
            value:data.LastName
        }, {
            name: 'Gender',
            type: require("mssql").VarChar(300),
            value:data.Gender
        }, {
            name: 'Contact',
            type: require("mssql").VarChar(300),
            value:data.Contact
        }, 
        {
            name: 'Address',
            type: require("mssql").VarChar(300),
            value:data.Address
        }, 
        {
            name: 'Model',
            type: require("mssql").VarChar(300),
            value:data.Model
        }, 
        {
            name: 'PNumber',
            type: require("mssql").VarChar(300),
            value:data.PlateNumber
        }, 
        {
            name: 'Series',
            type: require("mssql").VarChar(300),
            value:data.Series
        }, 
        {
            name: 'Commision',
            type: require("mssql").Int,
            value:data.Commission
        }, {
            name: 'IMAGE',
            type: require("mssql").VarChar(300),
            value:data._filename
        }]
    
    const result = db.execSPInsert("SP_EDIT_DELIVERYMAN",SPParams);
    return result;
}

userService.deleteAdmin = (data) => {
    const query = `EXEC DELETE_ADMIN '${data.id}'`;
    const result = db.runQuery(query);
    return result;
}
userService.deleteMerchant = (data) => {
    const query = `exec Delete_MERCHANT '${data.id}'`;
    const result = db.runQuery(query);
    return result;
}
userService.deleteShopowner = (data) => {
    const query = `exec DELETE_SHOP_OWNER '${data.id}'`;
    const result = db.runQuery(query);
    return result;
}
userService.deleteDeliveryman = (data) => {
    const query = `exec DELETE_DELIVERY_BOY '${data.id}'`;
    const result = db.runQuery(query);
    return result;
}

userService.getCSA=()=>{
    // const SPParams=[];
    // const keys=Object.keys(data);
    // for (let i = 0; i < keys.length; i++) {
    //     SPParams.push(
    //     {
    //         name: keys[i],
    //         value: data[keys[i]]
    //     })        
    // }
    return db.runQuery("select * from CustomerServiceAgent where ISNULL(DELETED,0)=0;")
}
userService.addNewCSA=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_ADD_NEW_CSA",SPParams);
}
userService.editCSA=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_EDIT_CSA",SPParams);
}
userService.viewCSA=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("select * from CustomerServiceAgent where ISNULL(DELETED,0)=0 and where id='"+data.Id+"';",SPParams);
}
userService.deleteCSA=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_DELETE_CSA",SPParams);
}

module.exports = userService;