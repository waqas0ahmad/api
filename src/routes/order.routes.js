var routes = require("express").Router();
const controllers = require("../controllers/index");
const M=require("../middlewares/admin.middleware");
routes.post("/place-order",M.login,controllers.order.placeOrder);
routes.post("/add-delivery",M.login,controllers.order.addDelivery);
module.exports = routes;