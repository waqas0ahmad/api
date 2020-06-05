const accountController = require("./account.controller");
const userController =require("./user.controller");
const zoneController =require("./zone.controller");
const productController =require("./product.controller");
const orderController =require("./order.controller");
const controllers = {
    "account": accountController,
    "user":userController,
    "zone":zoneController,
    "product":productController,
    "order":orderController
};
module.exports = controllers;