const accountService = require("./account.service");
const userService = require("./user.service");
const zoneService = require("./zone.service");
const productService = require("./product.service");
const orderService = require("./order.service");
const services = {
    "account": accountService,
    "user":userService,
    "zone":zoneService,
    "product":productService,
    "order":orderService
};
module.exports = services;