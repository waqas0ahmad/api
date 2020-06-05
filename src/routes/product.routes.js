const routes = require("express").Router();
const controllers = require("../controllers/index");
const AM=require("../middlewares/admin.middleware");

routes.get("/get",AM.Admin,controllers.product.get);
routes.get("/get/:id",AM.Admin,controllers.product.get);
routes.post("/add",AM.Admin,controllers.product.add);
routes.post("/update",AM.Admin,controllers.product.update);
routes.get("/delete/:id",AM.Admin,controllers.product.delete);

routes.get("/get-item-sizes",controllers.product.getItemSizes);
module.exports = routes;