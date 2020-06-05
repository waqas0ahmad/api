const services = require("../services/index");
const logger=require("../helper/logger.helper");

const zoneRepository = {};
zoneRepository.getAll=()=>{
    return new Promise((resolve,reject)=>{
        services.zone.getAll().then(result=>{
            resolve(result);
        }).catch(err=>{
            logger.log(err);
            reject("Something went wrong");
        });
    });
}
zoneRepository.get=(data)=>{return new Promise((resolve,reject)=>{
    services.zone.get(data).then(result=>{
        resolve(result[0]);
    }).catch(err=>{
        logger.log(err);
        reject("Something went wrong");
    });
})}
zoneRepository.add=(data)=>{return new Promise((resolve,reject)=>{
    services.zone.add(data).then(result=>{
        resolve(result);
    }).catch(err=>{
        logger.log(err);
        reject("Something went wrong");
    });
})}
zoneRepository.update=(data)=>{return new Promise((resolve,reject)=>{
    services.zone.update(data).then(result=>{
        resolve(result);
    }).catch(err=>{
        logger.log(err);
        reject("Something went wrong");
    });
})}
zoneRepository.delete=(data)=>{return new Promise((resolve,reject)=>{
    services.zone.delete(data).then(result=>{
        resolve(result);
    }).catch(err=>{
        logger.log(err);
        reject("Something went wrong");
    });
})}
module.exports = zoneRepository;