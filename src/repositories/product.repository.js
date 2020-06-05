const services = require("../services/index");
const jwt = require("../helper/jwt.helper");
const bcrypt = require("bcryptjs");
const logger = require("../helper/logger.helper");
const productRepository = {};
productRepository.get = (data) => {
    return new Promise((resolve, reject) => {
        services.product.get(data).then(result => {
            resolve(result);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong.")
        });
    });
}
productRepository.add = (data) => {
    return new Promise((resolve, reject) => {
        services.product.add(data).then(result => {
            resolve(result);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong.")
        });
    });
}
productRepository.update = (data) => {
    return new Promise((resolve, reject) => {
        services.product.update(data).then(result => {
            resolve("Product updated successfully.");
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong.")
        });
    });
}
productRepository.delete = (data) => {
    return new Promise((resolve, reject) => {
        services.product.delete(data).then(result => {
            resolve("Product removed.");
        }).catch(err => { logger.log(err); reject("Something went wrong.") });
    });
}
productRepository.getItemSizes = () => {
    return new Promise((resolve, reject) => {
        services.product.getItemSizes().then(result => {
            resolve(result);
        }).catch(err => {
            logger.log(err);
            reject("Something went wrong.")
        });
    });
}
module.exports = productRepository;