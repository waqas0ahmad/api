const accountRepository = require("./account.repository");
const userRepository = require("./user.repository");
const zoneRepository = require("./zone.repository");
const productRepository = require("./product.repository");
const orderRepository = require("./order.repository");
const repos = {
    "account": accountRepository,
    "user":userRepository,
    "zone":zoneRepository,
    "product":productRepository,
    "order":orderRepository
};
module.exports = repos;