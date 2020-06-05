const router = require("express").Router();
var routes = require("express").Router();
const controllers = require("../controllers/index");
const AM=require("../middlewares/admin.middleware");
routes.post("/login", controllers.account.login);
routes.post("/update-password", controllers.account.updatePassword);
module.exports = routes;