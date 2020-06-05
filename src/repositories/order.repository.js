const services = require("../services/index");
const logger=require("../helper/logger.helper");

const orderRepository = {};
orderRepository.placeOrder=(data)=>{
    return new Promise((resolve,reject)=>{
        services.order.placeOrder(data).then(res=>{
            if(res>0){
                resolve("Order placed successfully.");
            }else{
                reject("Error placing order.");
            }
        }).catch(err=>{
            logger.log(err);
            reject("Something went wrong.");
        });
    })
}
orderRepository.addDelivery=(data)=>{
    return new Promise((resolve,reject)=>{
        services.order.addDelivery(data).then(res=>{
            if(res>0){
                resolve("Order placed successfully.");
            }else{
                reject("Error placing order.");
            }
        }).catch(err=>{
            logger.log(err);
            reject("Something went wrong.");
        });
    })
}
module.exports = orderRepository;