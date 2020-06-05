
var routes = require("express").Router();
const controllers = require("../controllers/index");
const AM=require("../middlewares/admin.middleware");
routes.get("/get-all",AM.Admin, controllers.zone.getAll);
routes.get("/get/:id",AM.Admin, controllers.zone.get);
routes.post("/add",AM.Admin,controllers.zone.add);
routes.post("/update",AM.Admin,controllers.zone.update);
routes.post("/delete",AM.Admin,controllers.zone.delete);
module.exports = routes;