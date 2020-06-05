const R = require("../helper/response.helper");
const repos = require("../repositories/index");
const jwt = require("../helper/jwt.helper");
const orderController = {};
orderController.placeOrder=(req,res)=>{
    const{OrderSize,ExpectedDeliveryDate,OrderStatus,ShopOwnerId,MerchantId,ProductId}=req.body;
    if(!(OrderSize||ExpectedDeliveryDate||OrderStatus||ShopOwnerId||MerchantId||ProductId)){
        res.status(200).send(R.Fail("","Provide all required fields."));
    }else{
       const Id= jwt.decodeToken(req.headers.authorization).id;
        repos.order.placeOrder({OrderSize,ExpectedDeliveryDate,OrderStatus,ShopOwnerId,MerchantId,ProductId,CreatedBy:Id}).then(suc=>{
            res.status(err).send(R.Success({},suc));
        }).catch(err=>{
            res.status(err).send(R.Fail({},err));
        });
    }
}
orderController.addDelivery=(req,res)=>{
    const{OrderId,DeliveryManId,ZoneId,Location,DeliveryDate,OtherDeliveryDetails}=req.body;
    if(!(OrderId||DeliveryManId||ZoneId||Location||DeliveryDate||OtherDeliveryDetails)){
        res.status(200).send(R.Fail("","Provide all required fields."));
    }else{
       const Id= jwt.decodeToken(req.headers.authorization).id;
        repos.order.addDelivery({OrderId,DeliveryManId,ZoneId,Location,DeliveryDate,OtherDeliveryDetails,CreatedBy:Id}).then(suc=>{
            res.status(err).send(R.Success({},suc));
        }).catch(err=>{
            res.status(err).send(R.Fail({},err));
        });
    }
}
module.exports=orderController;