const db = require("../helper/database.mssql");
const productService = {};
productService.get=(data)=>{
    if(data.Id){
        
        return db.execSPSelect("SP_PRODUCT_GET",[{name:"Id",value:data.Id}]);
    }else{
        return db.execSPSelect("SP_PRODUCT_GET",[{name:"Id",value:0}]);
    }
}
productService.add=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_PRODUCT_ADD",SPParams);
}
productService.update=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_PRODUCT_UPDATE",SPParams);
}
productService.delete=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_PRODUCT_DELETE",SPParams);
}
productService.getItemSizes=()=>{
        return db.runQuery("select * from itemsize where isnull(deleted,0)=0;");
    
}
module.exports=productService;
