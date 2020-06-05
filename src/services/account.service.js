const db = require("../helper/database.mssql");
const accountService = {};
accountService.login = function(data) {
    // const result = db.runQuery("select * from [user] where username='" + data.username + "'");
    const result = db.runQuery("exec sp_login '" + data.username + "'");
    return result;
}
accountService.updatePassword = (id, password) => {
    const result = db.runQuery("update [user] set password='" + password + "' where id='" + id + "'");
    return result;
}
accountService.getUser = (username, userTypeId) => {
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
accountService.getAdmins = () => {
    const query="select * from admin";
    const result = db.runQuery(query);
    return result;
}
accountService.getMechants = () => {
    const query="select * from merchant";
    const result = db.runQuery(query);
    return result;
}
accountService.getShopOwner = () => {
    const query="select * from Shop_Owner";
    const result = db.runQuery(query);
    return result;
}
accountService.getDeliverMen = () => {
    const query="select * from Delivery_Man";
    const result = db.runQuery(query);
    return result;
}
accountService.addNewAdmin=(FirstName,LastName,Dob,Gender,Username,Password,filename)=>{
    const query=`exec sp_add_new_admin '${FirstName}','${LastName}','${Dob}','${Gender}','${Username}','${Password}','${filename}';`;
    const result = db.runQuery(query);
    return result;
}
accountService.checkUsername=(Username)=>{
    const query=`select * from [user] where username='${Username}'`;
    const result = db.runQuery(query);
    return result;
}
accountService.addNewShopowner=(FirstName,LastName,Bussiness_Name,Facebook_Name,Facebook_Page,Address,Postal_Code,State,City,Contact,Username,Password,filename)=>{
    const query=`exec sp_add_new_shopowner '${FirstName}','${LastName}','${Bussiness_Name}','${Facebook_Name}','${Facebook_Page}','${Address}','${Postal_Code}','${State}','${City}','${Contact}','${Username}','${Password}','${filename}';`;
    const result = db.runQuery(query);
    return result;
}

accountService.addNewMerchant=(FirstName,LastName,Address,Contact,Commision,Username,Password,filename)=>{
    const query=`exec INSERT_MERCHANT '${FirstName}','${LastName}','${Address}','${Contact}','${Commision}','${Username}','${Password}','${filename}';`;
    const result = db.runQuery(query);
    return result;
}
accountService.addNewDeliveryMan=(FirstName,LastName,Address,Gender,JoiningDate,Contact,Model,PlateNumber,Series,Commission,Username,Password,filename)=>{
    const query=`exec SP_ADD_NEW_DELIVERY_MAN '${FirstName}','${LastName}','${Address}','${Gender}','${JoiningDate}','${Contact}','${Model}','${PlateNumber}','${Series}','${Commission}','${Username}','${Password}','${filename}';`;
    const result = db.runQuery(query);
    return result;
}
module.exports = accountService;