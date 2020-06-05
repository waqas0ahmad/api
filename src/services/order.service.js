const db = require("../helper/database.mssql");
const orderService = {};
orderService.placeOrder=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_ORDER_PLACE",SPParams);
}
orderService.addDelivery=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_ADD_DELIVERY",SPParams);
}
module.exports=orderService;