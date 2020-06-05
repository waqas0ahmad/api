const db = require("../helper/database.mssql");
const zoneService = {};
zoneService.getAll=()=>{
    return db.execSPSelect("SP_ZONE_GET_ALL");
}
zoneService.get=(data)=>{
    return db.runQuery("SP_ZONE_GET_BY_ID '"+data.Id+"'");
}
zoneService.add=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_ZONE_ADD",SPParams);
}
zoneService.update=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_ZONE_UPDATE",SPParams);
}
zoneService.delete=(data)=>{
    const SPParams=[];
    const keys=Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        SPParams.push(
        {
            name: keys[i],
            value: data[keys[i]]
        })        
    }
    return db.execSPInsert("SP_ZONE_DELETE",SPParams);
}
module.exports = zoneService;