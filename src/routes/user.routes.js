var routes = require("express").Router();
const controllers = require("../controllers/index");
const AM=require("../middlewares/admin.middleware");
routes.get("/get-user", controllers.user.getUser);

routes.get("/get-admins",AM.Admin,controllers.user.getAdmins);
routes.get("/get-merchants",AM.Admin,controllers.user.getMechants);
routes.get("/get-shopowners",AM.Admin,controllers.user.getShopOwner);
routes.get("/get-deliverymen",AM.Admin,controllers.user.getDeliverMen);
routes.get("/get-csa",AM.Admin,controllers.user.getCSA);

routes.post("/add-new-admin",AM.Admin,controllers.user.addNewAdmin);
routes.post("/add-new-merchant",AM.Admin,controllers.user.addNewMerchant);
routes.post("/add-new-shopowner",AM.Admin,controllers.user.addNewShopowner);
routes.post("/add-new-deliverymen",AM.Admin,controllers.user.addNewDeliveryMan);
routes.post("/add-new-csa",AM.Admin,controllers.user.addNewCSA);


routes.post("/edit-admin",AM.Admin,controllers.user.editAdmin);
routes.post("/edit-merchant",AM.Admin,controllers.user.editMerchant);
routes.post("/edit-shopowner",AM.Admin,controllers.user.editShopowner);
routes.post("/edit-deliverymen",AM.Admin,controllers.user.editDeliveryman);
routes.post("/edit-csa",AM.Admin,controllers.user.editCSA);

routes.post("/view-admin",AM.Admin,controllers.user.viewAdmin);
routes.post("/view-merchant",AM.Admin,controllers.user.viewMerchant);
routes.post("/view-shopowner",AM.Admin,controllers.user.viewShopowner);
routes.post("/view-deliverymen",AM.Admin,controllers.user.viewDeliveryman);
routes.post("/view-csa",AM.Admin,controllers.user.viewCSA);

routes.post("/delete-admin",AM.Admin,controllers.user.deleteAdmin);
routes.post("/delete-merchant",AM.Admin,controllers.user.deleteMerchant);
routes.post("/delete-shopowner",AM.Admin,controllers.user.deleteShopowner);
routes.post("/delete-deliverymen",AM.Admin,controllers.user.deleteDeliveryman);
routes.post("/delete-csa",AM.Admin,controllers.user.deleteCSA);

module.exports = routes;